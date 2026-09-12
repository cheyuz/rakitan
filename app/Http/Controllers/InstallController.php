<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use PDO;
use Throwable;

class InstallController extends Controller
{
    /**
     * Display the Installation Wizard.
     */
    public function index(Request $request): Response
    {
        $requirements = [
            'php_version' => [
                'name' => 'PHP >= 8.2',
                'passed' => version_compare(PHP_VERSION, '8.2.0', '>='),
                'current' => PHP_VERSION,
            ],
            'pdo_mysql' => [
                'name' => 'PDO MySQL Extension',
                'passed' => extension_loaded('pdo_mysql'),
            ],
            'mbstring' => [
                'name' => 'Mbstring Extension',
                'passed' => extension_loaded('mbstring'),
            ],
            'openssl' => [
                'name' => 'OpenSSL Extension',
                'passed' => extension_loaded('openssl'),
            ],
            'xml' => [
                'name' => 'XML Extension',
                'passed' => extension_loaded('xml'),
            ],
            'storage_writable' => [
                'name' => 'Storage Directory Writable',
                'passed' => is_writable(storage_path()),
            ],
        ];

        $allRequirementsPassed = collect($requirements)->every(fn ($req) => $req['passed']);

        return Inertia::render('Install/Index', [
            'requirements' => $requirements,
            'allRequirementsPassed' => $allRequirementsPassed,
            'currentStep' => (int) $request->session()->get('install_step', 1),
            'dbConfig' => [
                'host' => env('DB_HOST', '127.0.0.1'),
                'port' => env('DB_PORT', '3306'),
                'database' => env('DB_DATABASE', 'db_rakitan'),
                'username' => env('DB_USERNAME', 'root'),
                'password' => env('DB_PASSWORD', ''),
                'auto_create_db' => true,
            ],
        ]);
    }

    /**
     * Test and configure MySQL Database, run migrations.
     */
    public function setupDatabase(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'host' => ['required', 'string'],
            'port' => ['required', 'numeric'],
            'database' => ['required', 'string'],
            'username' => ['required', 'string'],
            'password' => ['nullable', 'string'],
            'auto_create_db' => ['nullable', 'boolean'],
        ]);

        $host = $validated['host'];
        $port = $validated['port'];
        $dbName = $validated['database'];
        $username = $validated['username'];
        $password = $validated['password'] ?? '';
        $autoCreate = (bool) ($validated['auto_create_db'] ?? true);

        // 1. Test raw MySQL connection
        try {
            $dsn = "mysql:host={$host};port={$port};charset=utf8mb4";
            $pdo = new PDO($dsn, $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_TIMEOUT => 5,
            ]);
        } catch (Throwable $e) {
            return back()->withErrors([
                'database' => 'Could not connect to MySQL server with provided credentials: ' . $e->getMessage(),
            ]);
        }

        // 2. Auto-create database if requested
        try {
            if ($autoCreate) {
                $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            }
            $pdo->exec("USE `{$dbName}`");
        } catch (Throwable $e) {
            return back()->withErrors([
                'database' => "Database '{$dbName}' could not be accessed or created: " . $e->getMessage(),
            ]);
        }

        // 3. Update or create .env file
        $this->updateEnv([
            'DB_CONNECTION' => 'mysql',
            'DB_HOST' => $host,
            'DB_PORT' => $port,
            'DB_DATABASE' => $dbName,
            'DB_USERNAME' => $username,
            'DB_PASSWORD' => $password,
            'SESSION_DRIVER' => 'file',
        ]);

        // 4. Update runtime configuration
        Config::set('database.connections.mysql.host', $host);
        Config::set('database.connections.mysql.port', $port);
        Config::set('database.connections.mysql.database', $dbName);
        Config::set('database.connections.mysql.username', $username);
        Config::set('database.connections.mysql.password', $password);
        DB::purge('mysql');

        // 5. Generate application key if missing
        if (empty(env('APP_KEY'))) {
            Artisan::call('key:generate', ['--force' => true]);
        }

        // 6. Run database migrations safely
        try {
            Artisan::call('migrate', ['--force' => true]);
        } catch (Throwable $e) {
            return back()->withErrors([
                'database' => 'Migration execution failed: ' . $e->getMessage(),
            ]);
        }

        $request->session()->put('install_step', 3);

        return back()->with('success', 'Database connected and schema initialized successfully!');
    }

    /**
     * Setup Site Identity, Administrator Account, and Initial Content.
     */
    public function setupSite(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_title' => ['required', 'string', 'max:255'],
            'site_tagline' => ['nullable', 'string', 'max:255'],
            'admin_name' => ['required', 'string', 'max:255'],
            'admin_email' => ['required', 'email', 'max:255'],
            'admin_password' => ['required', 'string', 'min:8'],
            'seed_demo_pages' => ['nullable', 'boolean'],
        ]);

        // 1. Create or update Administrator user
        $admin = User::updateOrCreate(
            ['email' => $validated['admin_email']],
            [
                'name' => $validated['admin_name'],
                'password' => Hash::make($validated['admin_password']),
                'email_verified_at' => now(),
            ]
        );

        // 2. Set Site Settings
        Setting::set('site_title', $validated['site_title']);
        Setting::set('site_tagline', $validated['site_tagline'] ?? 'Next-Generation Modular Visual CMS');
        Setting::set('admin_email', $validated['admin_email']);
        Setting::set('default_status', 'draft');
        Setting::set('footer_text', "© " . date('Y') . " {$validated['site_title']}. Powered by Rakitan CMS.");

        // 3. Seed demo pages if requested
        if (!empty($validated['seed_demo_pages'])) {
            $this->seedInitialPages($admin);
        }

        // 4. Create the installation lock file
        $lockData = [
            'installed_at' => now()->toIso8601String(),
            'version' => '1.0.0',
            'site_title' => $validated['site_title'],
            'admin_email' => $validated['admin_email'],
        ];
        File::put(storage_path('installed'), json_encode($lockData, JSON_PRETTY_PRINT));

        $request->session()->put('install_step', 4);
        $request->session()->put('admin_email', $validated['admin_email']);

        return back()->with('success', 'Installation complete! You can now log in to your Rakitan dashboard.');
    }

    /**
     * Seed initial demo pages for a newly installed site.
     */
    protected function seedInitialPages(User $admin): void
    {
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Welcome to Rakitan CMS',
                'meta_title' => 'Rakitan CMS - The Next-Gen Modular Visual Builder',
                'meta_description' => 'A modern open-source CMS built with Laravel 11, Inertia.js React, Tailwind CSS, and a puzzle-like drag-and-drop block builder.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'hero-intro',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => '✨ Next-Gen Modular CMS',
                            'title' => 'Craft Your Dream Website Like Building a Puzzle',
                            'subtitle' => 'Rakitan CMS empowers developers and creators with independent modular blocks, lightning performance, and complete visual freedom.',
                            'primaryButtonText' => 'Start Building Now',
                            'primaryButtonUrl' => '/login',
                            'secondaryButtonText' => 'About Rakitan',
                            'secondaryButtonUrl' => '/about',
                            'alignment' => 'center',
                            'bgStyle' => 'gradient',
                            'imageUrl' => '',
                        ],
                    ],
                    [
                        'id' => 'feat-grid-1',
                        'type' => 'features',
                        'props' => [
                            'badge' => 'CORE CAPABILITIES',
                            'title' => 'Why Choose Rakitan CMS?',
                            'subtitle' => 'Every block is engineered for surgical precision, resulting in maximum page speed and an enjoyable publishing experience.',
                            'columns' => 3,
                            'items' => [
                                [
                                    'icon' => 'Layers',
                                    'title' => 'Puzzle Core Architecture',
                                    'description' => 'Each block is isolated with clean JSON schemas, making custom component extensions straightforward.',
                                    'badge' => 'Modular',
                                ],
                                [
                                    'icon' => 'Zap',
                                    'title' => 'Blazing Fast SPA',
                                    'description' => 'Powered by Laravel 11 and Inertia.js React for instant navigation without page reload delay.',
                                    'badge' => 'Fast',
                                ],
                                [
                                    'icon' => 'Sliders',
                                    'title' => 'Visual Drag & Drop',
                                    'description' => 'Arrange layouts, duplicate sections, and style properties interactively with live canvas preview.',
                                    'badge' => 'Intuitive',
                                ],
                            ],
                        ],
                    ],
                    [
                        'id' => 'cta-1',
                        'type' => 'cta',
                        'props' => [
                            'title' => 'Ready to Assemble Your Next Website?',
                            'description' => 'Explore the Rakitan visual builder today. Fully customizable, maintainable, and open source.',
                            'primaryButtonText' => 'Open Admin Dashboard',
                            'primaryButtonUrl' => '/admin/dashboard',
                            'secondaryButtonText' => 'View About Page',
                            'secondaryButtonUrl' => '/about',
                            'variant' => 'gradient',
                        ],
                    ],
                ],
            ]
        );

        Page::updateOrCreate(
            ['slug' => 'about'],
            [
                'title' => 'About Rakitan CMS',
                'meta_title' => 'About Rakitan - Mission & Philosophy',
                'meta_description' => 'Learn more about the Rakitan CMS open-source ecosystem.',
                'status' => 'published',
                'user_id' => $admin->id,
                'blocks' => [
                    [
                        'id' => 'about-hero',
                        'type' => 'hero',
                        'props' => [
                            'badgeText' => 'ABOUT US',
                            'title' => 'Building a Clean, Flexible, and Fast Web',
                            'subtitle' => 'Rakitan is dedicated to developers and site owners who desire an elegant content management system without unnecessary technical weight.',
                            'primaryButtonText' => 'Back to Home',
                            'primaryButtonUrl' => '/',
                            'secondaryButtonText' => 'GitHub Repository',
                            'secondaryButtonUrl' => 'https://github.com',
                            'alignment' => 'center',
                            'bgStyle' => 'dark',
                            'imageUrl' => '',
                        ],
                    ],
                ],
            ]
        );
    }

    /**
     * Helper to update or write values into .env
     */
    protected function updateEnv(array $data): void
    {
        $envPath = base_path('.env');
        if (!File::exists($envPath)) {
            if (File::exists(base_path('.env.example'))) {
                File::copy(base_path('.env.example'), $envPath);
            } else {
                File::put($envPath, '');
            }
        }

        $content = File::get($envPath);

        foreach ($data as $key => $value) {
            $escaped = preg_quote('=' . env($key), '/');
            if (preg_match("/^{$key}{$escaped}/m", $content)) {
                $content = preg_replace("/^{$key}=.*/m", "{$key}={$value}", $content);
            } elseif (preg_match("/^{$key}=.*/m", $content)) {
                $content = preg_replace("/^{$key}=.*/m", "{$key}={$value}", $content);
            } else {
                $content .= "\n{$key}={$value}";
            }
        }

        File::put($envPath, $content);
    }
}
