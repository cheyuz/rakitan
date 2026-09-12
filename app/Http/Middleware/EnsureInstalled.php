<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureInstalled
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isInstalled = file_exists(storage_path('installed'));
        $path = $request->path();

        // Allow static assets, vite hot reload, or debug routes
        if (
            str_starts_with($path, 'build') ||
            str_starts_with($path, 'images') ||
            str_starts_with($path, '@vite') ||
            str_starts_with($path, '@react-refresh')
        ) {
            return $next($request);
        }

        // If not yet installed, redirect everything to /install
        if (!$isInstalled) {
            if (!str_starts_with($path, 'install')) {
                return redirect()->route('install.index');
            }
            return $next($request);
        }

        // If already installed and user tries to access /install, redirect to homepage
        if ($isInstalled && str_starts_with($path, 'install')) {
            return redirect('/');
        }

        return $next($request);
    }
}
