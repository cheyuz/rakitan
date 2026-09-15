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

    /**
     * Test plugin admin navigation menu is injected only when active.
     */
    public function test_plugin_admin_menus_injected_only_when_active(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);
        $pluginManager = app(PluginManager::class);

        // Pastikan slider-builder tidak aktif
        if ($pluginManager->isActive('slider-builder')) {
            $pluginManager->togglePlugin('slider-builder');
        }

        $menusInactive = $pluginManager->getActiveAdminMenus($admin);
        $sliderMenu = array_filter($menusInactive, fn ($m) => ($m['plugin_id'] ?? '') === 'slider-builder');
        $this->assertEmpty($sliderMenu, 'Menu slider tidak boleh muncul saat plugin tidak aktif');

        // Aktifkan slider-builder
        $pluginManager->activate('slider-builder');
        $menusActive = $pluginManager->getActiveAdminMenus($admin);
        $sliderMenuActive = array_filter($menusActive, fn ($m) => ($m['plugin_id'] ?? '') === 'slider-builder');
        $this->assertNotEmpty($sliderMenuActive, 'Menu slider harus terinjeksi saat plugin aktif');

        $firstSliderMenu = array_values($sliderMenuActive)[0];
        $this->assertEquals('Sliders', $firstSliderMenu['label']);
        $this->assertEquals('/admin/sliders', $firstSliderMenu['href']);

        // Kembalikan ke non-aktif
        $pluginManager->togglePlugin('slider-builder');
    }
}
