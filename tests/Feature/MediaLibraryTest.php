<?php

namespace Tests\Feature;

use App\Models\Media;
use App\Models\MediaFolder;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaLibraryTest extends TestCase
{
    /**
     * Test admin can access media library index.
     */
    public function test_admin_can_access_media_library(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->get('/admin/media');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Media/Index')
                ->has('folders')
                ->has('media')
                ->has('breadcrumbs')
        );
    }

    /**
     * Test admin can create a media folder.
     */
    public function test_admin_can_create_folder(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $folderName = 'Test Folder ' . uniqid();
        $response = $this->actingAs($admin)->post('/admin/media/folders', [
            'name' => $folderName,
        ]);

        $response->assertRedirect();
        $folder = MediaFolder::where('name', $folderName)->first();
        $this->assertNotNull($folder);

        // Clean up
        $folder->delete();
    }

    /**
     * Test admin can upload media file.
     */
    public function test_admin_can_upload_media_file(): void
    {
        Storage::fake('public');
        $admin = User::first() ?? User::factory()->create();

        $file = UploadedFile::fake()->image('hero-sample.jpg', 600, 400);

        $response = $this->actingAs($admin)->post('/admin/media', [
            'files' => [$file],
        ]);

        $response->assertRedirect();
        $media = Media::where('name', 'hero-sample')->first();
        $this->assertNotNull($media);
        $this->assertTrue(str_contains($media->url, '/storage/media/'));

        // Clean up
        $media->delete();
    }

    /**
     * Test AJAX response for MediaPickerModal.
     */
    public function test_media_picker_ajax_endpoint(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->getJson('/admin/media?ajax=1');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'folders',
            'media',
            'breadcrumbs',
        ]);
    }
}
