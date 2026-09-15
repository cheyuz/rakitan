<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class DocumentationTest extends TestCase
{
    /**
     * Unauthenticated user cannot view documentation.
     */
    public function test_guest_is_redirected_to_login(): void
    {
        $response = $this->get('/admin/documentation');
        $response->assertRedirect('/login');
    }

    /**
     * Authenticated admin can view in-CMS documentation.
     */
    public function test_admin_can_view_documentation(): void
    {
        $admin = User::first() ?? User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/admin/documentation');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Documentation')
        );
    }
}
