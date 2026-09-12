<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Helper untuk mengambil nilai setting dengan default fallback
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) {
            return $default;
        }

        $val = $setting->value;
        if (is_string($val) && (str_starts_with($val, '[') || str_starts_with($val, '{'))) {
            $decoded = json_decode($val, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }
        }

        return $val;
    }

    /**
     * Helper untuk menyimpan atau memperbarui nilai setting
     */
    public static function set(string $key, mixed $value): void
    {
        $storeValue = is_array($value) || is_object($value) ? json_encode($value) : (string) $value;
        static::updateOrCreate(['key' => $key], ['value' => $storeValue]);
    }
}
