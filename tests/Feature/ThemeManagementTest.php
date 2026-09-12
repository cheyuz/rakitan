<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use Tests\TestCase;

class ThemeManagementTest extends TestCase
{
    /**
     * Test admin can access theme management page.
     */
    public function test_admin_can_access_themes_page(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->get('/admin/themes');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Themes/Index')
                ->has('themes')
                ->has('activeTheme')
        );
    }

    /**
     * Test admin can activate DefaultLight theme.
     */
    public function test_admin_can_activate_default_light_theme(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->post('/admin/themes/activate', [
            'theme' => 'default_light',
        ]);

        $response->assertRedirect();
        $this->assertEquals('default_light', Setting::get('active_theme'));

        // Switch back to default_dark
        Setting::set('active_theme', 'default_dark');
    }

    /**
     * Test public page shares active_theme prop.
     */
    public function test_public_page_shares_active_theme(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->has('active_theme')
        );
    }
}
