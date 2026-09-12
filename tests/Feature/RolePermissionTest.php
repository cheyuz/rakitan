<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RolePermissionTest extends TestCase
{
    /**
     * Test admin can access users management and system settings.
     */
    public function test_admin_can_access_system_settings_and_users(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/admin/users');
        $response->assertStatus(200);

        $response = $this->actingAs($admin)->get('/admin/plugins');
        $response->assertStatus(200);

        $response = $this->actingAs($admin)->get('/admin/settings');
        $response->assertStatus(200);
    }

    /**
     * Test editor cannot access system settings or users management.
     */
    public function test_editor_forbidden_from_admin_only_routes(): void
    {
        $editor = User::factory()->create([
            'role' => 'editor',
            'password' => Hash::make('password'),
        ]);

        // Editor CAN access pages
        $pageResponse = $this->actingAs($editor)->get('/admin/pages');
        $pageResponse->assertStatus(200);

        // Editor CAN access posts
        $postResponse = $this->actingAs($editor)->get('/admin/posts');
        $postResponse->assertStatus(200);

        // Editor CANNOT access settings (403 Forbidden)
        $settingsResponse = $this->actingAs($editor)->get('/admin/settings');
        $settingsResponse->assertStatus(403);

        // Editor CANNOT access plugins (403 Forbidden)
        $pluginsResponse = $this->actingAs($editor)->get('/admin/plugins');
        $pluginsResponse->assertStatus(403);

        // Editor CANNOT access users management (403 Forbidden)
        $usersResponse = $this->actingAs($editor)->get('/admin/users');
        $usersResponse->assertStatus(403);

        // Cleanup
        $editor->delete();
    }

    /**
     * Test admin can create, update, and delete user with role.
     */
    public function test_admin_can_manage_users(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);
        $uniqueEmail = 'testuser_' . uniqid() . '@example.com';

        // Create
        $response = $this->actingAs($admin)->post('/admin/users', [
            'name' => 'Test Team Member',
            'email' => $uniqueEmail,
            'password' => 'Password123!',
            'role' => 'editor',
        ]);

        $response->assertRedirect();
        $user = User::where('email', $uniqueEmail)->first();
        $this->assertNotNull($user);
        $this->assertEquals('editor', $user->role);
        $this->assertTrue($user->isEditor());

        // Update role
        $updateResponse = $this->actingAs($admin)->put("/admin/users/{$user->id}", [
            'name' => 'Updated Team Member',
            'email' => $uniqueEmail,
            'role' => 'author',
        ]);

        $updateResponse->assertRedirect();
        $user->refresh();
        $this->assertEquals('author', $user->role);
        $this->assertTrue($user->isAuthor());

        // Delete
        $deleteResponse = $this->actingAs($admin)->delete("/admin/users/{$user->id}");
        $deleteResponse->assertRedirect();
        $this->assertNull(User::find($user->id));
    }
}
