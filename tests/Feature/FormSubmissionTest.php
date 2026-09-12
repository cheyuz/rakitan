<?php

namespace Tests\Feature;

use App\Models\FormSubmission;
use App\Models\User;
use Tests\TestCase;

class FormSubmissionTest extends TestCase
{
    /**
     * Test public form submission API.
     */
    public function test_public_can_submit_contact_form(): void
    {
        $uniqueEmail = 'inquiry_' . uniqid() . '@client.com';

        $response = $this->postJson('/api/forms/submit', [
            'name' => 'Alice Morgan',
            'email' => $uniqueEmail,
            'subject' => 'Project Quote Inquiry',
            'message' => 'Hello, I would like to request a proposal for building a corporate portal using Rakitan CMS.',
            'form_name' => 'contact',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
        ]);

        $submission = FormSubmission::where('email', $uniqueEmail)->first();
        $this->assertNotNull($submission);
        $this->assertEquals('Alice Morgan', $submission->name);
        $this->assertFalse($submission->is_read);

        // Clean up
        $submission->delete();
    }

    /**
     * Test admin can access submissions inbox and toggle read status.
     */
    public function test_admin_can_manage_submissions(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::factory()->create(['role' => 'admin']);

        $submission = FormSubmission::create([
            'name' => 'Bob Builder',
            'email' => 'bob@example.com',
            'subject' => 'Feature Feedback',
            'message' => 'The new responsive mockup preview in visual builder is awesome!',
            'is_read' => false,
        ]);

        // Access inbox
        $response = $this->actingAs($admin)->get('/admin/submissions');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Admin/Submissions/Index')
                ->has('submissions')
        );

        // Toggle read
        $toggleResponse = $this->actingAs($admin)->post("/admin/submissions/{$submission->id}/toggle-read");
        $toggleResponse->assertRedirect();
        $submission->refresh();
        $this->assertTrue($submission->is_read);

        // Delete
        $deleteResponse = $this->actingAs($admin)->delete("/admin/submissions/{$submission->id}");
        $deleteResponse->assertRedirect();
        $this->assertNull(FormSubmission::find($submission->id));
    }
}
