<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicFormController extends Controller
{
    /**
     * Handle public contact form submission.
     */
    public function submit(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'form_name' => ['nullable', 'string', 'max:100'],
            'data' => ['nullable', 'array'],
        ]);

        $submission = FormSubmission::create([
            'form_name' => $validated['form_name'] ?? 'contact',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? 'Website Inquiry',
            'message' => $validated['message'],
            'data' => $validated['data'] ?? null,
            'is_read' => false,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully.',
            'id' => $submission->id,
        ]);
    }
}
