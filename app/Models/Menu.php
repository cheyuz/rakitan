<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];

    /**
     * Retrieve menu items for a specific location with optional fallback.
     */
    public static function getItems(string $location, array $fallback = []): array
    {
        $menu = static::where('location', $location)->first();

        if ($menu && !empty($menu->items)) {
            return $menu->items;
        }

        return $fallback;
    }
}
