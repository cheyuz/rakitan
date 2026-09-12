import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export const ContactFormComponent = ({ props = {} }) => {
    const {
        badge = 'GET IN TOUCH',
        title = 'Have a Project or Question? Let’s Talk.',
        subtitle = 'Send us a message and our team will get back to you within 24 hours.',
        formName = 'contact',
        buttonText = 'Send Message',
        successMessage = 'Thank you! Your message has been sent successfully. We will be in touch soon.',
    } = props;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    {badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{badge}</span>
                        </div>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-base text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Form Card */}
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                                        Your Name <span className="text-indigo-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Alex Rivera"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                                        Email Address <span className="text-indigo-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="alex@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Project Inquiry / Feedback"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Message <span className="text-indigo-400">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your project, timeline, and requirements..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 active:scale-95"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                <span>{submitting ? 'Sending Message...' : buttonText}</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export const ContactFormSettings = ({ props = {}, onChange }) => {
    const updateProp = (key, val) => {
        onChange({ ...props, [key]: val });
    };

    return (
        <div className="space-y-5 text-xs text-slate-300">
            <div>
                <label className="block text-slate-400 font-medium mb-1">Badge</label>
                <input
                    type="text"
                    value={props.badge || ''}
                    onChange={(e) => updateProp('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Title</label>
                <input
                    type="text"
                    value={props.title || ''}
                    onChange={(e) => updateProp('title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Subtitle</label>
                <textarea
                    rows={2}
                    value={props.subtitle || ''}
                    onChange={(e) => updateProp('subtitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Button Label</label>
                <input
                    type="text"
                    value={props.buttonText || ''}
                    onChange={(e) => updateProp('buttonText', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>

            <div>
                <label className="block text-slate-400 font-medium mb-1">Success Message</label>
                <textarea
                    rows={2}
                    value={props.successMessage || ''}
                    onChange={(e) => updateProp('successMessage', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
            </div>
        </div>
    );
};
