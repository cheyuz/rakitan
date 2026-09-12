<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Insert initial default settings
        DB::table('settings')->insert([
            ['key' => 'site_title', 'value' => 'Rakitan CMS', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'site_tagline', 'value' => 'Next-Generation Modular Visual CMS', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'admin_email', 'value' => 'admin@rakitan.test', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'default_status', 'value' => 'draft', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'footer_text', 'value' => '© 2026 Rakitan CMS. Built for the open-source community.', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
