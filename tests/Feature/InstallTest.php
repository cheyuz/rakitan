<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\File;
use Tests\TestCase;

class InstallTest extends TestCase
{
    /**
     * Test redirection to /install when application is not installed.
     */
    public function test_uninstalled_app_redirects_to_installer(): void
    {
        // Ensure not installed
        if (File::exists(storage_path('installed'))) {
            File::delete(storage_path('installed'));
        }

        $response = $this->get('/');
        $response->assertRedirect('/install');
    }

    /**
     * Test installer index page renders.
     */
    public function test_installer_page_renders(): void
    {
        if (File::exists(storage_path('installed'))) {
            File::delete(storage_path('installed'));
        }

        $response = $this->get('/install');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Install/Index')
                ->has('requirements')
                ->has('dbConfig')
        );
    }

    /**
     * Test database configuration step.
     */
    public function test_installer_database_step(): void
    {
        $response = $this->post('/install/database', [
            'host' => '127.0.0.1',
            'port' => '3306',
            'database' => 'db_rakitan',
            'username' => 'root',
            'password' => 'password',
            'auto_create_db' => true,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertEquals(3, session('install_step'));
    }

    /**
     * Test site identity and admin setup step.
     */
    public function test_installer_site_setup_step(): void
    {
        $response = $this->post('/install/site', [
            'site_title' => 'Rakitan Modular Site',
            'site_tagline' => 'Next-Gen CMS',
            'admin_name' => 'Rakitan Admin',
            'admin_email' => 'admin@rakitan.test',
            'admin_password' => 'password',
            'seed_demo_pages' => true,
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertFileExists(storage_path('installed'));
    }

    /**
     * Test that installed app redirects /install away to home.
     */
    public function test_installed_app_redirects_away_from_installer(): void
    {
        // Ensure lock file exists
        File::put(storage_path('installed'), json_encode(['version' => '1.0.0']));

        $response = $this->get('/install');
        $response->assertRedirect('/');
    }
}
