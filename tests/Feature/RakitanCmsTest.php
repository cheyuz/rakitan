<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class RakitanCmsTest extends TestCase
{
    /**
     * Test public homepage is accessible.
     */
    public function test_homepage_is_accessible(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Public/Show')
                ->has('page')
                ->where('page.slug', 'home')
                ->has('page.blocks')
        );
    }

    /**
     * Test public about page is accessible.
     */
    public function test_about_page_is_accessible(): void
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Public/Show')
                ->has('page')
                ->where('page.slug', 'about')
        );
    }

    /**
     * Test non-existent page returns 404.
     */
    public function test_nonexistent_page_returns_404(): void
    {
        $response = $this->get('/non-existent-page-404-check');

        $response->assertStatus(404);
    }

    /**
     * Test guest is redirected from admin dashboard.
     */
    public function test_guest_is_redirected_from_admin_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');

        $response->assertRedirect('/login');
    }

    /**
     * Test admin can access dashboard.
     */
    public function test_admin_can_access_dashboard(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();

        $response = $this->actingAs($admin)->get('/admin/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Dashboard')
                ->has('stats')
                ->has('recentPages')
        );
    }

    /**
     * Test admin can access visual builder.
     */
    public function test_admin_can_access_visual_builder(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();
        $page = Page::where('slug', 'home')->first();

        $response = $this->actingAs($admin)->get("/admin/pages/{$page->id}/builder");

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) =>
            $assert->component('Admin/Builder')
                ->has('page')
                ->where('page.id', $page->id)
        );
    }

    /**
     * Test admin can update settings.
     */
    public function test_admin_can_access_settings_and_update(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();

        $response = $this->actingAs($admin)->get('/admin/settings');
        $response->assertStatus(200);

        $postResponse = $this->actingAs($admin)->post('/admin/settings', [
            'site_title' => 'Rakitan CMS Tested',
            'site_tagline' => 'Next-Gen Visual Builder',
            'site_logo' => '/images/custom-logo.png',
            'site_favicon' => '/images/custom-favicon.png',
            'admin_email' => 'admin@rakitan.test',
            'default_status' => 'draft',
            'footer_text' => 'Tested Footer',
        ]);

        $postResponse->assertSessionHasNoErrors();
        $this->assertEquals('Rakitan CMS Tested', Setting::get('site_title'));
        $this->assertEquals('/images/custom-logo.png', Setting::get('site_logo'));
        $this->assertEquals('/images/custom-favicon.png', Setting::get('site_favicon'));
    }

    /**
     * Test admin can export pages to XML.
     */
    public function test_admin_can_export_xml(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();

        $response = $this->actingAs($admin)->get('/admin/tools/export');

        $response->assertStatus(200);
        $this->assertEquals('application/xml; charset=utf-8', $response->headers->get('content-type'));
    }

    /**
     * Test admin can import pages from XML file.
     */
    public function test_admin_can_import_xml(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();

        $xmlContent = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:wp="http://wordpress.org/export/1.2/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Test Import</title>
    <item>
      <title>Imported Test Page</title>
      <wp:post_name>imported-test-page</wp:post_name>
      <wp:status>publish</wp:status>
      <content:encoded><![CDATA[<p>Imported sample content</p>]]></content:encoded>
    </item>
  </channel>
</rss>
XML;

        $file = UploadedFile::fake()->createWithContent('import-test.xml', $xmlContent);

        $response = $this->actingAs($admin)->post('/admin/tools/import', [
            'xml_file' => $file,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('pages', [
            'title' => 'Imported Test Page',
            'slug' => 'imported-test-page',
        ]);
    }
}
