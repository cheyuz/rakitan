<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ToolsResetTest extends TestCase
{
    /**
     * Guest cannot access tools page or reset data.
     */
    public function test_guest_cannot_access_tools_or_reset(): void
    {
        $response = $this->get('/admin/tools');
        $response->assertRedirect('/login');

        $resetResponse = $this->post('/admin/tools/reset', [
            'password' => 'secret',
        ]);
        $resetResponse->assertRedirect('/login');
    }

    /**
     * Admin can view tools page.
     */
    public function test_admin_can_view_tools_page(): void
    {
        $admin = User::first() ?? User::factory()->create([
            'role' => 'admin',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->actingAs($admin)->get('/admin/tools');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Tools')
        );
    }

    /**
     * Reset fails if password incorrect.
     */
    public function test_reset_fails_with_invalid_password(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();
        if (!$admin) {
            $admin = User::factory()->create([
                'password' => Hash::make('correct_password'),
                'role' => 'admin',
            ]);
        } else {
            $admin->password = Hash::make('correct_password');
            $admin->save();
        }

        $response = $this->actingAs($admin)->post('/admin/tools/reset', [
            'password' => 'wrong_password_123',
        ]);

        $response->assertSessionHasErrors(['password']);
    }

    /**
     * Reset succeeds with valid password.
     */
    public function test_reset_succeeds_with_valid_password(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();
        if (!$admin) {
            $admin = User::factory()->create([
                'password' => Hash::make('valid_password_test'),
                'role' => 'admin',
            ]);
        } else {
            $admin->password = Hash::make('valid_password_test');
            $admin->save();
        }

        // Jalankan reset
        $response = $this->actingAs($admin)->post('/admin/tools/reset', [
            'password' => 'valid_password_test',
        ]);

        $response->assertRedirect('/admin/tools');
        $response->assertSessionHas('success');

        // Pastikan active_theme adalah default-dark
        $this->assertEquals('default-dark', Setting::get('active_theme'));

        // Pastikan active_plugins kosong
        $this->assertEquals([], Setting::get('active_plugins', []));

        // Pastikan halaman Home dan About ter-seed kembali
        $this->assertGreaterThanOrEqual(2, Page::count());
        $this->assertNotNull(Page::where('slug', 'home')->first());

        // Restore setting disabled_plugins & active_plugins for other tests
        Setting::set('disabled_plugins', []);
        Setting::set('active_plugins', ['hello-rakitan', 'rakitan-extended-blocks', 'seo-optimizer']);
        $admin->password = Hash::make('password');
        $admin->save();
    }
}
