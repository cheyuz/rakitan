<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use App\Services\ThemeManager;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Tests\TestCase;
use ZipArchive;

class ThemeSystemTest extends TestCase
{
    /**
     * Test admin can view themes list.
     */
    public function test_admin_can_view_themes(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->get('/admin/themes');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Themes/Index')
                ->has('themes')
                ->has('activeTheme')
                ->has('themesPath')
        );
    }

    /**
     * Test theme activation.
     */
    public function test_admin_can_activate_theme(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->post('/admin/themes/activate', [
            'theme' => 'default-light',
        ]);

        $response->assertRedirect();
        $this->assertEquals('default-light', Setting::get('active_theme'));

        // Reset back to default-dark
        $this->actingAs($admin)->post('/admin/themes/activate', [
            'theme' => 'default-dark',
        ]);
        $this->assertEquals('default-dark', Setting::get('active_theme'));
    }

    /**
     * Test theme assets (style.css and screenshot) can be served.
     */
    public function test_theme_assets_served(): void
    {
        // Style.css
        $cssResponse = $this->get('/themes/default-dark/style.css');
        $cssResponse->assertStatus(200);
        $cssResponse->assertHeader('Content-Type', 'text/css; charset=UTF-8');

        // Screenshot
        $imgResponse = $this->get('/themes/default-dark/screenshot');
        $imgResponse->assertStatus(200);
    }

    /**
     * Test admin can upload a valid theme ZIP and subsequently delete it.
     */
    public function test_admin_can_upload_and_delete_theme(): void
    {
        $admin = User::first() ?? User::factory()->create();
        $themeId = 'test-cyber-theme';

        // Prepare temporary zip
        $tempZip = tempnam(sys_get_temp_dir(), 'theme_') . '.zip';
        $zip = new ZipArchive();
        $this->assertTrue($zip->open($tempZip, ZipArchive::CREATE | ZipArchive::OVERWRITE));

        $manifest = [
            'id' => $themeId,
            'name' => 'Test Cyber Theme',
            'version' => '1.0.0',
            'author' => 'Test Author',
            'description' => 'A custom theme created by automated test',
        ];

        $zip->addFromString('theme.json', json_encode($manifest, JSON_PRETTY_PRINT));
        $zip->addFromString('style.css', '/* Custom test theme CSS */ body { background-color: #123456; }');
        $zip->close();

        $uploadedFile = new UploadedFile(
            $tempZip,
            'test-cyber-theme.zip',
            'application/zip',
            null,
            true
        );

        // Upload
        $response = $this->actingAs($admin)->post('/admin/themes/upload', [
            'theme_zip' => $uploadedFile,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Verify directory exists in themes/
        $themeManager = app(ThemeManager::class);
        $installedPath = $themeManager->getThemesPath() . '/' . $themeId;
        $this->assertTrue(File::isDirectory($installedPath));
        $this->assertTrue(File::exists($installedPath . '/theme.json'));

        // Delete the custom theme
        $deleteResponse = $this->actingAs($admin)->delete("/admin/themes/{$themeId}");
        $deleteResponse->assertRedirect();
        $deleteResponse->assertSessionHas('success');

        // Verify directory is deleted
        $this->assertFalse(File::isDirectory($installedPath));

        // Clean up temp file
        if (file_exists($tempZip)) {
            @unlink($tempZip);
        }
    }

    /**
     * Test protection: Cannot delete built-in themes.
     */
    public function test_cannot_delete_builtin_themes(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $response = $this->actingAs($admin)->delete('/admin/themes/default-dark');
        $response->assertRedirect();
        $response->assertSessionHasErrors(['error']);
    }
}
