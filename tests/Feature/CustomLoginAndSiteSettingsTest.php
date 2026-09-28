<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use App\Services\ThemeManager;
use Tests\TestCase;

class CustomLoginAndSiteSettingsTest extends TestCase
{
    /**
     * Test Settings index returns login_route_path and scanned themes including light-nabatis.
     */
    public function test_settings_index_contains_login_route_path_and_themes(): void
    {
        $admin = User::where('role', User::ROLE_ADMIN)->first() ?? User::first();

        $response = $this->actingAs($admin)->get('/admin/settings');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Settings')
                ->has('settings.login_route_path')
                ->has('settings.site_title')
                ->has('settings.site_tagline')
                ->has('themes')
        );
    }

    /**
     * Test ThemeManager detects light-nabatis.
     */
    public function test_theme_manager_detects_light_nabatis(): void
    {
        $manager = app(ThemeManager::class);
        $themes = $manager->scanThemes();

        $themeIds = array_column($themes, 'id');
        $this->assertContains('light-nabatis', $themeIds);

        // Test style.css endpoint
        $cssResponse = $this->get('/themes/light-nabatis/style.css');
        $cssResponse->assertStatus(200);
        $this->assertStringContainsString('theme-light-nabatis', $cssResponse->getContent());
    }

    /**
     * Test custom login route setting and 404 behavior on old login.
     */
    public function test_custom_login_route_behavior(): void
    {
        $admin = User::where('role', User::ROLE_ADMIN)->first() ?? User::first();
        $initialPath = Setting::get('login_route_path', 'login');

        try {
            // 1. Update login path to 'portal-masuk'
            $response = $this->actingAs($admin)->post('/admin/settings', [
                'site_title' => 'Rakitan Test CMS',
                'site_tagline' => 'Tagline Nabatis Hebat',
                'admin_email' => 'admin@test.test',
                'default_status' => 'draft',
                'login_route_path' => 'portal-masuk',
            ]);
            $response->assertSessionHasNoErrors();
            $this->assertEquals('portal-masuk', Setting::get('login_route_path'));

            // 2. Akses /portal-masuk sebagai guest harus 200
            $guestResponse = $this->get('/portal-masuk');
            $guestResponse->assertStatus(200);

            // 3. Akses /login lama harus 404
            $oldResponse = $this->get('/login');
            $oldResponse->assertStatus(404);

            // 4. Coba update dengan reserved keyword harus error
            $badResponse = $this->actingAs($admin)->post('/admin/settings', [
                'site_title' => 'Rakitan Test CMS',
                'admin_email' => 'admin@test.test',
                'default_status' => 'draft',
                'login_route_path' => 'admin',
            ]);
            $badResponse->assertSessionHasErrors('login_route_path');

        } finally {
            // Restore initial path
            Setting::set('login_route_path', $initialPath);
        }
    }

    /**
     * Test site_title and site_tagline shared in Inertia props.
     */
    public function test_site_title_and_tagline_shared_props(): void
    {
        Setting::set('site_title', 'Toko Herbal Nabatis');
        Setting::set('site_tagline', 'Kemurnian Nutrisi Segar Alami');

        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->where('site_title', 'Toko Herbal Nabatis')
                ->where('site_tagline', 'Kemurnian Nutrisi Segar Alami')
        );
    }
}
