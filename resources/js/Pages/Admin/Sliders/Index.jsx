import React, { useState, useEffect, useRef } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    SlidersHorizontal,
    Plus,
    Edit3,
    Trash2,
    Copy,
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Layout,
    Layers,
    Clock,
    Eye,
    Check,
    X,
    Star,
    ArrowRight,
    MoveUp,
    MoveDown,
    Image as ImageIcon,
    Sliders,
    MessageSquare,
    ExternalLink,
} from 'lucide-react';

const TEMPLATES = [
    {
        id: 'hero_banner',
        name: 'Hero Banner Modern',
        description: 'Full-width cinematic hero with bold headline, dual CTAs, badge, and glassmorphism controls.',
        icon: Layout,
        badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
        id: 'split_card',
        name: 'Split Card Showcase',
        description: 'Two-column presentation with persuasive copy on one side and a modern featured card on the other.',
        icon: Layers,
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
        id: 'testimonial',
        name: 'Testimonial Carousel',
        description: 'Customer review showcase with 5-star ratings, quotes, avatar images, and client designations.',
        icon: MessageSquare,
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    {
        id: 'minimal_fade',
        name: 'Minimal Fade Showcase',
        description: 'Clean visual gallery with smooth fade transitions, frosted glass bottom caption, and progress bars.',
        icon: Sliders,
        badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    },
];

export default function SlidersIndex({ sliders = [] }) {
    const { flash } = usePage().props;
    const [editingSlider, setEditingSlider] = useState(null); // null when not open, object when editing/creating
    const [isCreating, setIsCreating] = useState(false);
    const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'settings' | 'preview'
    const [previewIndex, setPreviewIndex] = useState(0);
    const [copiedId, setCopiedId] = useState(null);

    // Form state for creating/editing
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        template: 'hero_banner',
        settings: {
            autoplay: true,
            interval: 5000,
            transition: 'slide',
            showArrows: true,
            showDots: true,
            height: 'tall',
            pauseOnHover: true,
        },
        slides: [],
    });

    const openCreateModal = () => {
        setIsCreating(true);
        setFormData({
            title: 'New Promotional Slider',
            slug: 'promo-slider-' + Math.floor(Math.random() * 1000),
            description: 'Custom slider presentation for high conversions.',
            template: 'hero_banner',
            settings: {
                autoplay: true,
                interval: 5000,
                transition: 'slide',
                showArrows: true,
                showDots: true,
                height: 'tall',
                pauseOnHover: true,
            },
            slides: [
                {
                    id: 'slide-1',
                    badge: 'NEW ARRIVAL',
                    title: 'Empower Your Vision with Modular Power',
                    subtitle: 'Create responsive web experiences with ease, speed, and precision.',
                    primaryButtonText: 'Explore Platform',
                    primaryButtonUrl: '#',
                    secondaryButtonText: 'Learn More',
                    secondaryButtonUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
                },
                {
                    id: 'slide-2',
                    badge: 'LIGHTNING FAST',
                    title: 'Optimized Architecture for Instant Hydration',
                    subtitle: 'Sub-45ms responses guaranteed with smart edge caching and modular asset loading.',
                    primaryButtonText: 'View Specs',
                    primaryButtonUrl: '#',
                    secondaryButtonText: 'Try Now',
                    secondaryButtonUrl: '#',
                    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
                },
            ],
        });
        setActiveTab('slides');
        setPreviewIndex(0);
        setEditingSlider({});
    };

    const openEditModal = (slider) => {
        setIsCreating(false);
        setFormData({
            id: slider.id,
            title: slider.title || '',
            slug: slider.slug || '',
            description: slider.description || '',
            template: slider.template || 'hero_banner',
            settings: {
                autoplay: slider.settings?.autoplay ?? true,
                interval: slider.settings?.interval ?? 5000,
                transition: slider.settings?.transition ?? 'slide',
                showArrows: slider.settings?.showArrows ?? true,
                showDots: slider.settings?.showDots ?? true,
                height: slider.settings?.height ?? 'tall',
                pauseOnHover: slider.settings?.pauseOnHover ?? true,
            },
            slides: slider.slides ? JSON.parse(JSON.stringify(slider.slides)) : [],
        });
        setActiveTab('slides');
        setPreviewIndex(0);
        setEditingSlider(slider);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (isCreating) {
            router.post('/admin/sliders', formData, {
                onSuccess: () => setEditingSlider(null),
            });
        } else {
            router.put(`/admin/sliders/${formData.id}`, formData, {
                onSuccess: () => setEditingSlider(null),
            });
        }
    };

    const handleDelete = (slider) => {
        if (confirm(`Are you sure you want to delete slider "${slider.title}"?`)) {
            router.delete(`/admin/sliders/${slider.id}`);
        }
    };

    const handleAddSlide = () => {
        const isTestimonial = formData.template === 'testimonial';
        const newSlide = isTestimonial
            ? {
                  id: 'review-' + Date.now(),
                  quote: 'Outstanding software architecture and remarkable user experience.',
                  author: 'Jane Doe',
                  role: 'Product Specialist, Acme Corp',
                  rating: 5,
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
              }
            : {
                  id: 'slide-' + Date.now(),
                  badge: 'FEATURE HIGHLIGHT',
                  title: 'New Showcase Slide Headline',
                  subtitle: 'Detailed descriptive summary highlighting benefits and value proposition.',
                  primaryButtonText: 'Get Started',
                  primaryButtonUrl: '#',
                  secondaryButtonText: 'Learn More',
                  secondaryButtonUrl: '#',
                  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
              };

        setFormData({
            ...formData,
            slides: [...formData.slides, newSlide],
        });
    };

    const handleUpdateSlide = (idx, field, value) => {
        const updated = [...formData.slides];
        updated[idx] = { ...updated[idx], [field]: value };
        setFormData({ ...formData, slides: updated });
    };

    const handleRemoveSlide = (idx) => {
        if (formData.slides.length <= 1) {
            alert('A slider must have at least 1 slide.');
            return;
        }
        const updated = formData.slides.filter((_, i) => i !== idx);
        setFormData({ ...formData, slides: updated });
        if (previewIndex >= updated.length) {
            setPreviewIndex(Math.max(0, updated.length - 1));
        }
    };

    const handleMoveSlide = (idx, direction) => {
        const targetIdx = idx + direction;
        if (targetIdx < 0 || targetIdx >= formData.slides.length) return;
        const updated = [...formData.slides];
        const temp = updated[idx];
        updated[idx] = updated[targetIdx];
        updated[targetIdx] = temp;
        setFormData({ ...formData, slides: updated });
    };

    // Auto preview slider loop
    useEffect(() => {
        if (activeTab !== 'preview') return;
        if (!formData.settings.autoplay || formData.slides.length <= 1) return;

        const interval = setInterval(() => {
            setPreviewIndex((prev) => (prev + 1) % formData.slides.length);
        }, formData.settings.interval || 5000);

        return () => clearInterval(interval);
    }, [activeTab, previewIndex, formData.settings.autoplay, formData.settings.interval, formData.slides.length]);

    const copyShortcode = (slider) => {
        const text = `slider_builder: ${slider.slug || slider.id}`;
        navigator.clipboard.writeText(text);
        setCopiedId(slider.id);
        setTimeout(() => setCopiedId(null), 2500);
    };

    return (
        <AdminLayout title="Slider Builder">
            <Head title="Slider Builder - Manage Sliders" />

            <div className="space-y-6">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                Plugin Addon
                            </span>
                            <span className="text-xs text-slate-400">v1.0.0</span>
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                            <SlidersHorizontal className="w-7 h-7 text-indigo-400" />
                            <span>Slider Builder Management</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Design, customize, and maintain dynamic carousels with multiple preset styles, integrated directly into the Visual Builder.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create New Slider</span>
                    </button>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Sliders Grid List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sliders.map((slider) => {
                        const templateDef = TEMPLATES.find((t) => t.id === slider.template) || TEMPLATES[0];
                        const TemplateIcon = templateDef.icon;
                        const slidesCount = slider.slides?.length || 0;

                        return (
                            <div
                                key={slider.id}
                                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
                            >
                                <div className="space-y-4">
                                    {/* Card Header & Badge */}
                                    <div className="flex items-start justify-between gap-2">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${templateDef.badgeColor}`}>
                                            <TemplateIcon className="w-3.5 h-3.5" />
                                            <span>{templateDef.name}</span>
                                        </span>
                                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                            {slidesCount} {slidesCount === 1 ? 'Slide' : 'Slides'}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <div>
                                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                                            {slider.title}
                                        </h3>
                                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                            {slider.description || 'No description provided.'}
                                        </p>
                                    </div>

                                    {/* Thumbnail Preview strip */}
                                    <div className="h-28 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 relative flex items-center justify-center">
                                        {slider.slides?.[0]?.imageUrl ? (
                                            <img
                                                src={slider.slides[0].imageUrl}
                                                alt={slider.title}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                                            />
                                        ) : slider.template === 'testimonial' ? (
                                            <div className="p-4 text-center">
                                                <div className="flex justify-center text-amber-400 mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="text-[11px] text-slate-300 italic line-clamp-2">
                                                    "{slider.slides?.[0]?.quote}"
                                                </p>
                                            </div>
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-slate-700" />
                                        )}
                                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-slate-800">
                                            ID: {slider.slug || slider.id}
                                        </div>
                                    </div>

                                    {/* Settings summary badges */}
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-indigo-400" />
                                            {slider.settings?.autoplay ? `${(slider.settings?.interval || 5000) / 1000}s autoplay` : 'Manual'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Layers className="w-3 h-3 text-cyan-400" />
                                            {slider.settings?.transition || 'slide'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => copyShortcode(slider)}
                                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                                        title="Copy identifier for Visual Builder"
                                    >
                                        {copiedId === slider.id ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="text-emerald-400">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy ID</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(slider)}
                                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                                        >
                                            <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                                            <span>Edit & Preview</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(slider)}
                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                            title="Delete Slider"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Edit / Create Full Modal */}
            {editingSlider && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    <SlidersHorizontal className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        {isCreating ? 'Create New Slider' : `Edit: ${formData.title}`}
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        Configure slides, template styles, transitions, and test live interactions.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingSlider(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Subheader Navigation Tabs */}
                        <div className="px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('slides')}
                                    className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                                        activeTab === 'slides'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <Layers className="w-4 h-4" />
                                    <span>Slides Management ({formData.slides.length})</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('settings')}
                                    className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                                        activeTab === 'settings'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <Sliders className="w-4 h-4" />
                                    <span>Slider & Template Settings</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('preview')}
                                    className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                                        activeTab === 'preview'
                                            ? 'border-indigo-500 text-indigo-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Live Interactive Preview</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {/* TAB 1: SLIDES MANAGEMENT */}
                            {activeTab === 'slides' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-white">Slide Items</h3>
                                            <p className="text-xs text-slate-400">
                                                Manage the content, imagery, and actions for each slide.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddSlide}
                                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>Add New Slide</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {formData.slides.map((slide, idx) => (
                                            <div
                                                key={slide.id || idx}
                                                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3 relative group"
                                            >
                                                {/* Slide Header */}
                                                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs flex items-center justify-center font-bold">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-xs font-semibold text-white">
                                                            {slide.title || slide.quote || `Slide #${idx + 1}`}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            disabled={idx === 0}
                                                            onClick={() => handleMoveSlide(idx, -1)}
                                                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                                                            title="Move Up"
                                                        >
                                                            <MoveUp className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            disabled={idx === formData.slides.length - 1}
                                                            onClick={() => handleMoveSlide(idx, 1)}
                                                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                                                            title="Move Down"
                                                        >
                                                            <MoveDown className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSlide(idx)}
                                                            className="p-1 rounded hover:bg-red-500/20 text-red-400"
                                                            title="Remove Slide"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Slide Fields based on Template */}
                                                {formData.template === 'testimonial' ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Quote / Review Content</label>
                                                            <textarea
                                                                rows={2}
                                                                value={slide.quote || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'quote', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="Customer testimonial quote..."
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Author Name</label>
                                                            <input
                                                                type="text"
                                                                value={slide.author || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'author', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="e.g. Alex Rivera"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Role / Designation</label>
                                                            <input
                                                                type="text"
                                                                value={slide.role || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'role', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="e.g. CTO, Apex Digital"
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Avatar Image URL</label>
                                                            <input
                                                                type="text"
                                                                value={slide.avatar || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'avatar', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="https://..."
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Badge Text</label>
                                                            <input
                                                                type="text"
                                                                value={slide.badge || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'badge', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="e.g. NEW FEATURE"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Slide Title</label>
                                                            <input
                                                                type="text"
                                                                value={slide.title || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'title', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none font-semibold"
                                                                placeholder="Headline..."
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Subtitle / Summary</label>
                                                            <textarea
                                                                rows={2}
                                                                value={slide.subtitle || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'subtitle', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="Supporting description..."
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Image URL</label>
                                                            <input
                                                                type="text"
                                                                value={slide.imageUrl || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'imageUrl', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="https://images.unsplash.com/..."
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Primary Button Text</label>
                                                            <input
                                                                type="text"
                                                                value={slide.primaryButtonText || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'primaryButtonText', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="Get Started"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Primary Button URL</label>
                                                            <input
                                                                type="text"
                                                                value={slide.primaryButtonUrl || ''}
                                                                onChange={(e) => handleUpdateSlide(idx, 'primaryButtonUrl', e.target.value)}
                                                                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                                placeholder="#"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: SETTINGS & TEMPLATES */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6 text-xs">
                                    {/* Identity */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                                        <h3 className="text-sm font-bold text-white">General Information</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Slider Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Slug Identifier</label>
                                                <input
                                                    type="text"
                                                    value={formData.slug}
                                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none font-mono"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Description (Internal)</label>
                                                <input
                                                    type="text"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Selection */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                                        <h3 className="text-sm font-bold text-white">Choose Presentation Template</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {TEMPLATES.map((tmpl) => {
                                                const Icon = tmpl.icon;
                                                const isSelected = formData.template === tmpl.id;
                                                return (
                                                    <div
                                                        key={tmpl.id}
                                                        onClick={() => setFormData({ ...formData, template: tmpl.id })}
                                                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                                                            isSelected
                                                                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                                                                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                                <Icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold text-white">{tmpl.name}</h4>
                                                                <p className="text-[11px] text-slate-400 mt-0.5">{tmpl.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Slider Controls Settings */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                                        <h3 className="text-sm font-bold text-white">Playback & Navigation Controls</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Autoplay</label>
                                                <select
                                                    value={formData.settings.autoplay ? 'true' : 'false'}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, autoplay: e.target.value === 'true' },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value="true">Enabled</option>
                                                    <option value="false">Disabled</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Interval Duration</label>
                                                <select
                                                    value={formData.settings.interval}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, interval: Number(e.target.value) },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value={3000}>3 Seconds (Fast)</option>
                                                    <option value={5000}>5 Seconds (Default)</option>
                                                    <option value={7000}>7 Seconds (Relaxed)</option>
                                                    <option value={10000}>10 Seconds (Long)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Transition Effect</label>
                                                <select
                                                    value={formData.settings.transition}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, transition: e.target.value },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value="slide">Horizontal Slide</option>
                                                    <option value="fade">Smooth Fade</option>
                                                    <option value="zoom">Subtle Zoom</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Navigation Arrows</label>
                                                <select
                                                    value={formData.settings.showArrows ? 'true' : 'false'}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, showArrows: e.target.value === 'true' },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value="true">Show Arrows</option>
                                                    <option value="false">Hide Arrows</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Pagination Dots</label>
                                                <select
                                                    value={formData.settings.showDots ? 'true' : 'false'}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, showDots: e.target.value === 'true' },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value="true">Show Dots Indicator</option>
                                                    <option value="false">Hide Dots Indicator</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-medium text-slate-400 mb-1">Height Profile</label>
                                                <select
                                                    value={formData.settings.height}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            settings: { ...formData.settings, height: e.target.value },
                                                        })
                                                    }
                                                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                                >
                                                    <option value="compact">Compact (380px)</option>
                                                    <option value="medium">Medium (500px)</option>
                                                    <option value="tall">Tall (620px)</option>
                                                    <option value="fullscreen">Fullscreen Hero</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: LIVE INTERACTIVE PREVIEW */}
                            {activeTab === 'preview' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span>Testing active preview in template: <strong className="text-white font-semibold">{formData.template}</strong></span>
                                        <span>Slide {previewIndex + 1} of {formData.slides.length}</span>
                                    </div>

                                    {/* Real-time slider frame */}
                                    <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden relative min-h-[420px] flex items-center justify-center">
                                        {formData.slides.length === 0 ? (
                                            <p className="text-xs text-slate-500">No slides configured to preview.</p>
                                        ) : (
                                            (() => {
                                                const currentSlide = formData.slides[previewIndex] || formData.slides[0];

                                                if (formData.template === 'testimonial') {
                                                    return (
                                                        <div className="p-8 sm:p-12 max-w-3xl mx-auto text-center space-y-6">
                                                            <div className="flex justify-center text-amber-400 gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className="w-5 h-5 fill-current" />
                                                                ))}
                                                            </div>
                                                            <blockquote className="text-lg sm:text-xl font-medium text-white italic leading-relaxed">
                                                                "{currentSlide.quote}"
                                                            </blockquote>
                                                            <div className="flex items-center justify-center gap-3">
                                                                {currentSlide.avatar && (
                                                                    <img
                                                                        src={currentSlide.avatar}
                                                                        alt={currentSlide.author}
                                                                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                                                                    />
                                                                )}
                                                                <div className="text-left">
                                                                    <div className="font-bold text-white text-sm">{currentSlide.author}</div>
                                                                    <div className="text-xs text-slate-400">{currentSlide.role}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                if (formData.template === 'split_card') {
                                                    return (
                                                        <div className="p-8 sm:p-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                                                            <div className="space-y-4">
                                                                {currentSlide.badge && (
                                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                                        {currentSlide.badge}
                                                                    </span>
                                                                )}
                                                                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                                                    {currentSlide.title}
                                                                </h2>
                                                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                                                    {currentSlide.subtitle}
                                                                </p>
                                                                <div className="pt-2 flex items-center gap-3">
                                                                    {currentSlide.primaryButtonText && (
                                                                        <span className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2">
                                                                            {currentSlide.primaryButtonText}
                                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/3]">
                                                                {currentSlide.imageUrl ? (
                                                                    <img
                                                                        src={currentSlide.imageUrl}
                                                                        alt={currentSlide.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                                                                        <ImageIcon className="w-12 h-12" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // Hero Banner & Minimal Fade
                                                return (
                                                    <div className="w-full h-full relative min-h-[420px] flex items-center justify-center overflow-hidden">
                                                        {currentSlide.imageUrl && (
                                                            <img
                                                                src={currentSlide.imageUrl}
                                                                alt={currentSlide.title}
                                                                className="absolute inset-0 w-full h-full object-cover opacity-35"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                                                        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-12 space-y-4">
                                                            {currentSlide.badge && (
                                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                                                    {currentSlide.badge}
                                                                </span>
                                                            )}
                                                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                                                {currentSlide.title}
                                                            </h2>
                                                            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                                                                {currentSlide.subtitle}
                                                            </p>
                                                            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                                                                {currentSlide.primaryButtonText && (
                                                                    <span className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25">
                                                                        {currentSlide.primaryButtonText}
                                                                    </span>
                                                                )}
                                                                {currentSlide.secondaryButtonText && (
                                                                    <span className="px-5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-semibold text-xs">
                                                                        {currentSlide.secondaryButtonText}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()
                                        )}

                                        {/* Navigation Controls Overlay */}
                                        {formData.settings.showArrows && formData.slides.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPreviewIndex((prev) =>
                                                            prev === 0 ? formData.slides.length - 1 : prev - 1
                                                        )
                                                    }
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-700/80 text-white hover:bg-slate-800 transition-all z-20 backdrop-blur-md shadow-lg"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPreviewIndex((prev) => (prev + 1) % formData.slides.length)
                                                    }
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-700/80 text-white hover:bg-slate-800 transition-all z-20 backdrop-blur-md shadow-lg"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}

                                        {/* Pagination Dots */}
                                        {formData.settings.showDots && formData.slides.length > 1 && (
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                                                {formData.slides.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setPreviewIndex(i)}
                                                        className={`h-2 rounded-full transition-all ${
                                                            previewIndex === i
                                                                ? 'w-6 bg-indigo-500'
                                                                : 'w-2 bg-slate-600 hover:bg-slate-500'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setEditingSlider(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                <span>{isCreating ? 'Create Slider' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
