<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FormSubmissionController extends Controller
{
    /**
     * Display inbox list of submissions.
     */
    public function index(Request $request): Response
    {
        $query = FormSubmission::query()->latest();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->input('status') === 'unread') {
                $query->where('is_read', false);
            } elseif ($request->input('status') === 'read') {
                $query->where('is_read', true);
            }
        }

        $submissions = $query->paginate(15)->withQueryString();
        $unreadCount = FormSubmission::where('is_read', false)->count();

        return Inertia::render('Admin/Submissions/Index', [
            'submissions' => $submissions,
            'unreadCount' => $unreadCount,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', ''),
            ],
        ]);
    }

    /**
     * Toggle read/unread status.
     */
    public function toggleRead(FormSubmission $submission): RedirectResponse
    {
        $submission->update([
            'is_read' => !$submission->is_read,
        ]);

        return back()->with('success', 'Submission status updated.');
    }

    /**
     * Delete a submission.
     */
    public function destroy(FormSubmission $submission): RedirectResponse
    {
        $submission->delete();
        return back()->with('success', 'Submission deleted successfully.');
    }
}
