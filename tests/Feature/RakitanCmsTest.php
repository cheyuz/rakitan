<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\User;
use Tests\TestCase;

class RakitanCmsTest extends TestCase
{
    /**
     * Test halaman publik homepage dapat diakses dengan sukses.
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
     * Test halaman publik about dapat diakses dengan sukses.
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
     * Test halaman tidak dikenal mengembalikan 404.
     */
    public function test_nonexistent_page_returns_404(): void
    {
        $response = $this->get('/halaman-yang-pasti-tidak-ada-12345');

        $response->assertStatus(404);
    }

    /**
     * Test tamu diarahkan ke login saat mengakses dashboard admin.
     */
    public function test_guest_is_redirected_from_admin_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');

        $response->assertRedirect('/login');
    }

    /**
     * Test admin dapat mengakses dashboard admin.
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
     * Test admin dapat mengakses Visual Builder halaman.
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
     * Test admin dapat menyimpan blok pada Visual Builder.
     */
    public function test_admin_can_save_builder_blocks(): void
    {
        $admin = User::where('email', 'admin@rakitan.test')->first();
        $page = Page::where('slug', 'home')->first();

        $updatedBlocks = [
            [
                'id' => 'hero-test-1',
                'type' => 'hero',
                'props' => [
                    'title' => 'Judul Baru dari Unit Test',
                    'subtitle' => 'Subjudul diperbarui',
                ],
            ]
        ];

        $response = $this->actingAs($admin)->put("/admin/pages/{$page->id}", [
            'title' => $page->title,
            'slug' => $page->slug,
            'status' => 'published',
            'blocks' => $updatedBlocks,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect();

        $page->refresh();
        $this->assertEquals('hero-test-1', $page->blocks[0]['id']);
        $this->assertEquals('Judul Baru dari Unit Test', $page->blocks[0]['props']['title']);
    }
}
