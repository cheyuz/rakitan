<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ToolsController extends Controller
{
    /**
     * Display the Tools page for Export & Import.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Tools', [
            'stats' => [
                'totalPages' => Page::count(),
                'publishedPages' => Page::where('status', 'published')->count(),
                'draftPages' => Page::where('status', 'draft')->count(),
            ],
        ]);
    }

    /**
     * Export CMS Pages to WordPress-compatible WXR XML format.
     */
    public function export(Request $request): StreamedResponse
    {
        $status = $request->query('status', 'all');

        $query = Page::query()->with('author:id,name,email');
        if (in_array($status, ['published', 'draft'])) {
            $query->where('status', $status);
        }
        $pages = $query->get();

        $filename = 'rakitan-export-' . date('Y-m-d-His') . '.xml';

        return response()->streamDownload(function () use ($pages) {
            $xml = new \XMLWriter();
            $xml->openMemory();
            $xml->setIndent(true);
            $xml->setIndentString('  ');

            $xml->startDocument('1.0', 'UTF-8');
            $xml->startElement('rss');
            $xml->writeAttribute('version', '2.0');
            $xml->writeAttribute('xmlns:excerpt', 'http://wordpress.org/export/1.2/excerpt/');
            $xml->writeAttribute('xmlns:content', 'http://purl.org/rss/1.0/modules/content/');
            $xml->writeAttribute('xmlns:wfw', 'http://wellformedweb.org/CommentAPI/');
            $xml->writeAttribute('xmlns:dc', 'http://purl.org/dc/elements/1.1/');
            $xml->writeAttribute('xmlns:wp', 'http://wordpress.org/export/1.2/');

            $xml->startElement('channel');
            $xml->writeElement('title', config('app.name', 'Rakitan CMS'));
            $xml->writeElement('link', url('/'));
            $xml->writeElement('description', 'Rakitan CMS Export File');
            $xml->writeElement('pubDate', date('r'));
            $xml->writeElement('language', 'en');
            $xml->writeElement('wp:wxr_version', '1.2');

            foreach ($pages as $page) {
                $xml->startElement('item');
                $xml->writeElement('title', $page->title);
                $xml->writeElement('link', url($page->slug === 'home' ? '/' : '/' . $page->slug));
                $xml->writeElement('pubDate', $page->created_at->format('r'));
                $xml->writeElement('dc:creator', $page->author?->name ?? 'Admin');
                $xml->writeElement('wp:post_id', (string) $page->id);
                $xml->writeElement('wp:post_date', $page->created_at->toDateTimeString());
                $xml->writeElement('wp:post_name', $page->slug);
                $xml->writeElement('wp:status', $page->status === 'published' ? 'publish' : 'draft');
                $xml->writeElement('wp:post_type', 'page');

                // Content encoded as JSON blocks
                $xml->startElement('content:encoded');
                $xml->writeCdata(json_encode($page->blocks ?? [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
                $xml->endElement();

                // Custom Post Meta for Rakitan Blocks & SEO
                $xml->startElement('wp:postmeta');
                $xml->writeElement('wp:meta_key', 'rakitan_blocks');
                $xml->startElement('wp:meta_value');
                $xml->writeCdata(json_encode($page->blocks ?? [], JSON_UNESCAPED_UNICODE));
                $xml->endElement();
                $xml->endElement();

                if ($page->meta_title) {
                    $xml->startElement('wp:postmeta');
                    $xml->writeElement('wp:meta_key', 'meta_title');
                    $xml->writeElement('wp:meta_value', $page->meta_title);
                    $xml->endElement();
                }

                if ($page->meta_description) {
                    $xml->startElement('wp:postmeta');
                    $xml->writeElement('wp:meta_key', 'meta_description');
                    $xml->writeElement('wp:meta_value', $page->meta_description);
                    $xml->endElement();
                }

                $xml->endElement(); // item
            }

            $xml->endElement(); // channel
            $xml->endElement(); // rss
            $xml->endDocument();

            echo $xml->outputMemory();
        }, $filename, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }

    /**
     * Import Pages from an uploaded WordPress WXR or Rakitan XML file.
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'xml_file' => ['required', 'file', 'mimes:xml,text,txt', 'max:10240'], // 10MB limit
        ]);

        $file = $request->file('xml_file');
        $content = file_get_contents($file->getRealPath());

        if (!$content) {
            return back()->with('error', 'The uploaded XML file is empty.');
        }

        // Secure XML parsing: disable network entities and suppress external entity injection
        $previousEntityLoader = false;
        if (\PHP_VERSION_ID < 80000 && function_exists('libxml_disable_entity_loader')) {
            $previousEntityLoader = libxml_disable_entity_loader(true);
        }

        $xml = @simplexml_load_string($content, 'SimpleXMLElement', LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);

        if (\PHP_VERSION_ID < 80000 && function_exists('libxml_disable_entity_loader')) {
            libxml_disable_entity_loader($previousEntityLoader);
        }

        if (!$xml || !isset($xml->channel)) {
            return back()->with('error', 'Invalid XML format. Please upload a valid WordPress WXR or Rakitan XML file.');
        }

        $importedCount = 0;
        $items = $xml->channel->item ?? [];

        foreach ($items as $item) {
            $namespaces = $item->getNameSpaces(true);
            $wp = isset($namespaces['wp']) ? $item->children($namespaces['wp']) : null;
            $contentNs = isset($namespaces['content']) ? $item->children($namespaces['content']) : null;

            $title = (string) ($item->title ?? 'Imported Page');
            $slug = (string) ($wp->post_name ?? Str::slug($title));
            $wpStatus = (string) ($wp->status ?? 'draft');
            $status = ($wpStatus === 'publish' || $wpStatus === 'published') ? 'published' : 'draft';

            // Find blocks in postmeta or content
            $blocks = null;
            $metaTitle = null;
            $metaDescription = null;

            if (isset($wp->postmeta)) {
                foreach ($wp->postmeta as $pm) {
                    $key = (string) $pm->meta_key;
                    $val = (string) $pm->meta_value;
                    if ($key === 'rakitan_blocks') {
                        $decoded = json_decode($val, true);
                        if (is_array($decoded)) {
                            $blocks = $decoded;
                        }
                    } elseif ($key === 'meta_title') {
                        $metaTitle = $val;
                    } elseif ($key === 'meta_description') {
                        $metaDescription = $val;
                    }
                }
            }

            // Fallback: Check if content:encoded contains JSON blocks or regular HTML content
            if (!$blocks && $contentNs && isset($contentNs->encoded)) {
                $rawContent = (string) $contentNs->encoded;
                $decoded = json_decode($rawContent, true);
                if (is_array($decoded) && isset($decoded[0]['type'])) {
                    $blocks = $decoded;
                } elseif (!empty($rawContent)) {
                    // Convert standard WordPress post content into a Rakitan Rich Text block!
                    $blocks = [
                        [
                            'id' => 'imported-text-' . Str::random(8),
                            'type' => 'rich_text',
                            'props' => [
                                'title' => $title,
                                'containerWidth' => 'normal',
                                'alignment' => 'left',
                                'dropCap' => false,
                                'content' => $rawContent,
                            ],
                        ],
                    ];
                }
            }

            // Default fallback block if empty
            if (!$blocks) {
                $blocks = [
                    [
                        'id' => 'hero-' . Str::random(8),
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'Imported',
                            'title' => $title,
                            'subtitle' => 'This page was imported from an external XML file.',
                        ],
                    ],
                ];
            }

            // Ensure unique slug
            $baseSlug = $slug ? Str::slug($slug) : Str::slug($title);
            $uniqueSlug = $baseSlug;
            $counter = 1;
            while (Page::where('slug', $uniqueSlug)->exists()) {
                $uniqueSlug = "{$baseSlug}-{$counter}";
                $counter++;
            }

            Page::create([
                'title' => $title,
                'slug' => $uniqueSlug,
                'meta_title' => $metaTitle ?? $title,
                'meta_description' => $metaDescription ?? null,
                'status' => $status,
                'blocks' => $blocks,
                'user_id' => $request->user()?->id,
            ]);

            $importedCount++;
        }

        return back()->with('success', "Successfully imported {$importedCount} pages into Rakitan CMS!");
    }
}
