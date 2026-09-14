<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use App\Models\User;
use App\Services\PluginManager;
use Tests\TestCase;

class SeoPluginTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Ensure seo-optimizer plugin is active during test
        $pluginManager = app(PluginManager::class);
        if (!$pluginManager->isActive('seo-optimizer')) {
            $pluginManager->activate('seo-optimizer');
        }
    }

    /**
     * Test dynamic sitemap.xml endpoint returns valid XML and includes published content.
     */
    public function test_sitemap_xml_endpoint(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');
        $this->assertStringContainsString('<?xml version="1.0" encoding="UTF-8"?>', $response->getContent());
        $this->assertStringContainsString('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', $response->getContent());
    }

    /**
     * Test robots.txt endpoint returns text configuration.
     */
    public function test_robots_txt_endpoint(): void
    {
        $response = $this->get('/robots.txt');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
        $this->assertStringContainsString('User-agent: *', $response->getContent());
        $this->assertStringContainsString('Sitemap:', $response->getContent());
    }

    /**
     * Test admin can access SEO settings dashboard.
     */
    public function test_admin_can_access_seo_dashboard(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->get('/admin/seo');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Seo/Index')
                ->has('settings')
                ->has('stats')
                ->has('sitemapUrl')
        );
    }

    /**
     * Test admin can update SEO settings.
     */
    public function test_admin_can_update_seo_settings(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $payload = [
            'site_name' => 'Rakitan Modular Studio',
            'title_separator' => '|',
            'default_meta_description' => 'A cutting-edge open-source CMS built with Laravel and React.',
            'og_default_image' => '/images/custom-og.png',
            'twitter_card' => 'summary_large_image',
            'google_verification' => 'google-verification-code-12345',
            'robots_indexing' => 'index, follow',
            'auto_sitemap' => true,
        ];

        $response = $this->actingAs($admin)->from('/admin/seo')->post('/admin/seo', $payload);

        $response->assertRedirect('/admin/seo');
        $saved = Setting::get('seo_settings');
        $this->assertIsArray($saved);
        $this->assertEquals('Rakitan Modular Studio', $saved['site_name']);
        $this->assertEquals('|', $saved['title_separator']);
        $this->assertEquals('google-verification-code-12345', $saved['google_verification']);
    }

    /**
     * Test SEO data is shared with Inertia props when visiting public pages.
     */
    public function test_public_page_shares_seo_props(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->has('seo')
                ->has('seo.site_name')
                ->has('seo.default_meta_description')
        );
    }
}
