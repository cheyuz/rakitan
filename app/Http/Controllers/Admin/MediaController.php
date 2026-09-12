<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaFolder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    /**
     * Display media library files and folders.
     */
    public function index(Request $request): Response|JsonResponse
    {
        $folderId = $request->input('folder_id');
        if ($folderId === 'null' || $folderId === '') {
            $folderId = null;
        }

        $currentFolder = $folderId ? MediaFolder::find($folderId) : null;

        // Subfolders in the current directory
        $folders = MediaFolder::where('parent_id', $folderId)
            ->withCount('media')
            ->orderBy('name', 'asc')
            ->get();

        // Files in the current directory
        $query = Media::where('folder_id', $folderId)->latest();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('file_name', 'like', "%{$search}%");
        }

        $media = $query->get();

        // Build breadcrumb trail
        $breadcrumbs = [
            ['id' => null, 'name' => 'All Media'],
        ];

        if ($currentFolder) {
            $trail = [];
            $curr = $currentFolder;
            while ($curr) {
                array_unshift($trail, ['id' => $curr->id, 'name' => $curr->name]);
                $curr = $curr->parent;
            }
            $breadcrumbs = array_merge($breadcrumbs, $trail);
        }

        // Return JSON if requested by MediaPickerModal
        if ($request->wantsJson() || $request->input('ajax') == '1') {
            return response()->json([
                'currentFolder' => $currentFolder,
                'folders' => $folders,
                'media' => $media,
                'breadcrumbs' => $breadcrumbs,
            ]);
        }

        return Inertia::render('Admin/Media/Index', [
            'currentFolder' => $currentFolder,
            'folders' => $folders,
            'media' => $media,
            'breadcrumbs' => $breadcrumbs,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Create a new folder.
     */
    public function storeFolder(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'parent_id' => ['nullable', 'exists:media_folders,id'],
        ]);

        $folder = MediaFolder::create([
            'name' => $validated['name'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'folder' => $folder]);
        }

        return back()->with('success', "Folder '{$folder->name}' created successfully!");
    }

    /**
     * Upload one or more files into current folder.
     */
    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $request->validate([
            'folder_id' => ['nullable', 'exists:media_folders,id'],
            'files' => ['nullable', 'array'],
            'files.*' => ['file', 'max:20480'], // max 20MB
            'file' => ['nullable', 'file', 'max:20480'],
        ]);

        $uploadedFiles = [];
        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');
        } elseif ($request->hasFile('file')) {
            $uploadedFiles = [$request->file('file')];
        }

        if (empty($uploadedFiles)) {
            if ($request->wantsJson()) {
                return response()->json(['error' => 'No files were provided.'], 422);
            }
            return back()->withErrors(['files' => 'Please select at least one file to upload.']);
        }

        $folderId = $request->input('folder_id');
        if ($folderId === 'null' || $folderId === '') {
            $folderId = null;
        }

        $createdMedia = [];

        foreach ($uploadedFiles as $file) {
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $safeName = Str::slug($originalName);
            $fileName = $safeName . '-' . uniqid() . '.' . $extension;

            // Store in storage/app/public/media
            $path = $file->storeAs('media', $fileName, 'public');
            $url = '/storage/' . $path;

            $mediaItem = Media::create([
                'folder_id' => $folderId,
                'user_id' => $request->user()?->id,
                'name' => $originalName,
                'file_name' => $fileName,
                'path' => $path,
                'disk' => 'public',
                'url' => $url,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);

            $createdMedia[] = $mediaItem;
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'uploaded' => $createdMedia,
            ]);
        }

        return back()->with('success', count($createdMedia) . ' file(s) uploaded successfully!');
    }

    /**
     * Delete a media item.
     */
    public function destroy(Request $request, Media $media): RedirectResponse|JsonResponse
    {
        // Remove file from disk
        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $media->delete();

        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return back()->with('success', 'Media file deleted successfully.');
    }

    /**
     * Delete a folder and its contents.
     */
    public function destroyFolder(Request $request, MediaFolder $folder): RedirectResponse|JsonResponse
    {
        // Delete all files inside this folder from storage
        $files = Media::where('folder_id', $folder->id)->get();
        foreach ($files as $file) {
            if (Storage::disk($file->disk)->exists($file->path)) {
                Storage::disk($file->disk)->delete($file->path);
            }
            $file->delete();
        }

        $folder->delete();

        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return back()->with('success', 'Folder and its contents were deleted successfully.');
    }
}
