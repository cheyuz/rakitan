import React, { useState } from 'react';
import {
    Send,
    Mail,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const DEFAULT_CONTACT_FIELDS = [
    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Alex Rivera', required: true, width: 'half' },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'alex@example.com', required: true, width: 'half' },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry / Feedback', required: false, width: 'full' },
    { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your project, timeline, and requirements...', required: true, width: 'full' },
];

export const ContactFormComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'GET IN TOUCH',
        title = 'Have a Project or Question? Let’s Talk.',
        subtitle = 'Send us a message and our team will get back to you within 24 hours.',
        formName = 'contact',
        buttonText = 'Send Message',
        successMessage = 'Thank you! Your message has been sent successfully. We will be in touch soon.',
        fields = DEFAULT_CONTACT_FIELDS,
        isCustom = false,
        subComponents = [],
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    // State form submission
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (fieldId, val) => {
        setFormData((prev) => ({ ...prev, [fieldId]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMessage('');

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/api/forms/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                body: JSON.stringify({
                    ...formData,
                    form_name: formName,
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setErrorMessage(data.message || 'Something went wrong. Please check your inputs and try again.');
            }
        } catch (err) {
            setErrorMessage('Unable to connect to server. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                {isCustom ? (
                    <div className="w-full">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Drag & Drop Sub-Komponen (Text, Input, Alert, Button, Social) ke Formulir Kustom Ini..."
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                                        <Mail className="w-3.5 h-3.5" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Badge Text"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}

                            {(title || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="title"
                                    label="Headline"
                                    isCustom={isCustom}
                                >
                                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                                        <InlineText
                                            value={title}
                                            onChange={(val) => handlePropChange('title', val)}
                                            placeholder="Headline Title"
                                        />
                                    </h2>
                                </DefaultElementWrapper>
                            )}

                            {(subtitle || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="subtitle"
                                    label="Subtitle"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base text-slate-400 leading-relaxed">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Subtitle / Description"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Form Card */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="form"
                            label="Form Card"
                            isCustom={isCustom}
                        >
                            <div className="rounded-3xl p-8 sm:p-10 bg-slate-900/60 border border-slate-800 shadow-2xl">
                                {submitted ? (
                                    <div className="py-12 text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                                        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                                            {successMessage}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setSubmitted(false)}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
                                        >
                                            <span>Send Another Message</span>
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {errorMessage && (
                                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}

                                        {/* Standard Inputs Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                                    Your Name <span className="text-indigo-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name || ''}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    placeholder="Alex Rivera"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>

                                            <div className="col-span-1">
                                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                                    Email Address <span className="text-indigo-400">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email || ''}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="alex@example.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>

                                            <div className="col-span-1 sm:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.subject || ''}
                                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                                    placeholder="Project Inquiry / Feedback"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                                />
                                            </div>

                                            <div className="col-span-1 sm:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                                    Message <span className="text-indigo-400">*</span>
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    required
                                                    value={formData.message || ''}
                                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                                    placeholder="Tell us about your project, timeline, and requirements..."
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Sub-Components Slot inside Form */}
                                        <div className="pt-2">
                                            <SubComponentSlot
                                                blockId={blockId}
                                                subComponents={subComponents}
                                                emptyPlaceholder="Sisipkan sub-components (Badge respon, Alert info, Social links, dsb.) di sini..."
                                            />
                                        </div>

                                        <DefaultElementWrapper
                                            blockId={blockId}
                                            elementKey="button"
                                            label="Button"
                                            isCustom={isCustom}
                                        >
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 active:scale-95"
                                            >
                                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                <span>
                                                    <InlineText
                                                        value={buttonText}
                                                        onChange={(val) => handlePropChange('buttonText', val)}
                                                        placeholder="Button Label"
                                                    />
                                                </span>
                                            </button>
                                        </DefaultElementWrapper>
                                    </form>
                                )}
                            </div>
                        </DefaultElementWrapper>
                    </>
                )}
            </div>
        </section>
    );
};

export const ContactFormSettings = ({ props = {}, updateProps }) => {
    return (
        <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 space-y-1">
                <div className="font-semibold text-[11px]">✨ Visual Canvas Editing</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                    Setiap elemen di panel tengah (Badge, Title, Subtitle, Form, Tombol) dapat diklik teksnya langsung atau dihapus (🗑️) saat hover untuk mengaktifkan slot drag & drop.
                </p>
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Form Action Name</label>
                <input
                    type="text"
                    value={props.formName || 'contact'}
                    onChange={(e) => updateProps({ formName: e.target.value })}
                    placeholder="contact"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Submit Button Text</label>
                <input
                    type="text"
                    value={props.buttonText || 'Send Message'}
                    onChange={(e) => updateProps({ buttonText: e.target.value })}
                    placeholder="Send Message"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:border-indigo-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Success Message</label>
                <textarea
                    rows={3}
                    value={props.successMessage || 'Thank you! Your message has been sent successfully.'}
                    onChange={(e) => updateProps({ successMessage: e.target.value })}
                    placeholder="Enter success message..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none focus:border-indigo-500"
                />
            </div>
        </div>
    );
};
