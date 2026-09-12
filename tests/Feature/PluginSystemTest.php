<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\PluginManager;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Tests\TestCase;
use ZipArchive;

class PluginSystemTest extends TestCase
{
    /**
     * Test admin can view plugins list.
     */
    public function test_admin_can_view_plugins(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/admin/plugins');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Plugins/Index')
                ->has('plugins')
                ->has('pluginsPath')
        );
    }

    /**
     * Test admin can toggle plugin status.
     */
    public function test_admin_can_toggle_plugin(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $pluginManager = app(PluginManager::class);
        $initialActive = in_array('hello-rakitan', $pluginManager->getActivePluginIds(), true);

        $response = $this->actingAs($admin)->post('/admin/plugins/toggle', [
            'plugin' => 'hello-rakitan',
        ]);

        $response->assertRedirect();
        $this->assertNotEquals($initialActive, in_array('hello-rakitan', $pluginManager->getActivePluginIds(), true));

        // Revert back
        $this->actingAs($admin)->post('/admin/plugins/toggle', [
            'plugin' => 'hello-rakitan',
        ]);
    }

    /**
     * Test admin can upload custom plugin zip and delete it.
     */
    public function test_admin_can_upload_and_delete_plugin(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);
        $pluginId = 'test-mock-plugin';

        // Prepare temporary zip
        $tempZip = tempnam(sys_get_temp_dir(), 'plugin_') . '.zip';
        $zip = new ZipArchive();
        $this->assertTrue($zip->open($tempZip, ZipArchive::CREATE | ZipArchive::OVERWRITE));

        $manifest = [
            'id' => $pluginId,
            'name' => 'Test Mock Plugin',
            'version' => '1.0.0',
            'author' => 'Test Suite',
            'description' => 'A mock plugin created by automated testing',
        ];

        $zip->addFromString('plugin.json', json_encode($manifest, JSON_PRETTY_PRINT));
        $zip->close();

        $uploadedFile = new UploadedFile(
            $tempZip,
            'test-mock-plugin.zip',
            'application/zip',
            null,
            true
        );

        // Upload
        $response = $this->actingAs($admin)->post('/admin/plugins/upload', [
            'plugin_zip' => $uploadedFile,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Check directory exists in plugins/
        $pluginManager = app(PluginManager::class);
        $installedPath = $pluginManager->getPluginsPath() . '/' . $pluginId;
        $this->assertTrue(File::isDirectory($installedPath));
        $this->assertTrue(File::exists($installedPath . '/plugin.json'));

        // Delete
        $deleteResponse = $this->actingAs($admin)->delete("/admin/plugins/{$pluginId}");
        $deleteResponse->assertRedirect();
        $deleteResponse->assertSessionHas('success');

        $this->assertFalse(File::isDirectory($installedPath));

        if (file_exists($tempZip)) {
            @unlink($tempZip);
        }
    }
}
