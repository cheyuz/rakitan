<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\Page;
use App\Models\User;
use Tests\TestCase;

class MenuAndLayoutTest extends TestCase
{
    /**
     * Test admin can update header menu items.
     */
    public function test_admin_can_update_menu(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->post('/admin/menus', [
            'location' => 'header',
            'name' => 'Main Navigation',
            'items' => [
                ['id' => '1', 'label' => 'Home', 'url' => '/', 'target' => '_self'],
                ['id' => '2', 'label' => 'Articles', 'url' => '/blog', 'target' => '_self'],
            ],
        ]);

        $response->assertRedirect();
        $menu = Menu::where('location', 'header')->first();
        $this->assertNotNull($menu);
        $this->assertCount(2, $menu->items);
    }

    /**
     * Test page with custom layout returns layout property.
     */
    public function test_page_layout_support(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $slug = 'test-layout-' . uniqid();
        $page = Page::create([
            'title' => 'Test LP Canvas',
            'slug' => $slug,
            'layout' => 'blank',
            'status' => 'published',
            'user_id' => $admin->id,
            'blocks' => [],
        ]);

        $response = $this->get("/{$slug}");
        $response->assertStatus(200);
        $response->assertInertia(fn ($inert) =>
            $inert->component('Public/Show')
                ->where('page.layout', 'blank')
        );

        $page->delete();
    }
}
