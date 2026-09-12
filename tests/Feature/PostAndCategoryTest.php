<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Tests\TestCase;

class PostAndCategoryTest extends TestCase
{
    /**
     * Test public blog index is accessible.
     */
    public function test_public_blog_index_is_accessible(): void
    {
        $response = $this->get('/blog');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Public/Blog/Index')
                ->has('posts')
                ->has('categories')
                ->has('navigation')
        );
    }

    /**
     * Test public single blog post view is accessible.
     */
    public function test_public_single_post_is_accessible(): void
    {
        $post = Post::published()->first();

        if ($post) {
            $response = $this->get("/blog/{$post->slug}");

            $response->assertStatus(200);
            $response->assertInertia(fn ($page) =>
                $page->component('Public/Blog/Show')
                    ->has('post')
                    ->where('post.slug', $post->slug)
            );
        } else {
            $this->assertTrue(true);
        }
    }

    /**
     * Test API endpoint for latest posts.
     */
    public function test_api_latest_posts_endpoint(): void
    {
        $response = $this->getJson('/api/latest-posts?limit=3');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'title',
                'slug',
                'excerpt',
                'featured_image',
                'published_at',
            ]
        ]);
    }

    /**
     * Test authenticated admin can create and manage categories.
     */
    public function test_admin_can_manage_categories(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $slug = 'test-category-' . uniqid();
        $response = $this->actingAs($admin)->post('/admin/categories', [
            'name' => 'Automated Test Category',
            'slug' => $slug,
            'description' => 'Test description',
        ]);

        $response->assertRedirect();
        $category = Category::where('slug', $slug)->first();
        $this->assertNotNull($category);

        // Clean up test category
        $category->delete();
    }

    /**
     * Test authenticated admin can create and manage posts.
     */
    public function test_admin_can_create_post(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $slug = 'test-post-' . uniqid();
        $response = $this->actingAs($admin)->post('/admin/posts', [
            'title' => 'Automated Test Post',
            'slug' => $slug,
            'excerpt' => 'Test summary',
            'content' => 'Test content body',
            'layout' => 'boxed',
            'status' => 'draft',
        ]);

        $response->assertRedirect('/admin/posts');
        $post = Post::where('slug', $slug)->first();
        $this->assertNotNull($post);
        $this->assertEquals('boxed', $post->layout);

        // Clean up test post
        $post->delete();
    }
}
