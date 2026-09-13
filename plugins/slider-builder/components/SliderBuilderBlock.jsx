import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Star,
    ArrowRight,
    Sparkles,
    SlidersHorizontal,
    Plus,
    Trash2,
    MoveUp,
    MoveDown,
    ExternalLink,
    Image as ImageIcon,
} from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const SliderBuilderComponent = ({ props = {}, blockId }) => {
    const {
        source = 'custom', // 'custom' | 'saved'
        sliderId = '',
        template = 'hero_banner', // 'hero_banner' | 'split_card' | 'testimonial' | 'minimal_fade'
        settings = {},
        slides = [],
        bgStyle = 'none',
        padding = 'none',
    } = props;

    const {
        autoplay = true,
        interval = 5000,
        transition = 'slide',
        showArrows = true,
        showDots = true,
        height = 'tall',
        pauseOnHover = true,
    } = settings;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [savedData, setSavedData] = useState(null);

    // Fetch saved slider if source is 'saved'
    useEffect(() => {
        if (source === 'saved' && sliderId) {
            fetch('/api/sliders')
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        const found = data.find((s) => s.id === sliderId || s.slug === sliderId);
                        if (found) {
                            setSavedData(found);
                        }
                    }
                })
                .catch((err) => console.warn('[SliderBuilder] Failed to load saved slider:', err));
        } else {
            setSavedData(null);
        }
    }, [source, sliderId]);

    // Determine active template, settings, and slides
    const activeTemplate = savedData?.template || template || 'hero_banner';
    const activeSettings = savedData?.settings || settings;
    const activeSlides = (savedData?.slides && savedData.slides.length > 0)
        ? savedData.slides
        : (slides && slides.length > 0)
        ? slides
        : [
              {
                  id: 'default-1',
                  badge: 'MODULAR BUILDER',
                  title: 'Assemble Next-Gen Experiences Seamlessly',
                  subtitle: 'Create responsive web experiences with ease, speed, and precision.',
                  primaryButtonText: 'Get Started',
                  primaryButtonUrl: '#',
                  secondaryButtonText: 'Learn More',
                  secondaryButtonUrl: '#',
                  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
              },
          ];

    const slideCount = activeSlides.length;

    // Autoplay Timer Loop
    useEffect(() => {
        const isAutoplay = activeSettings.autoplay !== false;
        if (!isAutoplay || slideCount <= 1) return;
        if (activeSettings.pauseOnHover && isHovered) return;

        const duration = activeSettings.interval || 5000;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slideCount);
        }, duration);

        return () => clearInterval(timer);
    }, [slideCount, isHovered, activeSettings.autoplay, activeSettings.interval, activeSettings.pauseOnHover]);

    const handlePrev = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % slideCount);
    };

    const handleDotClick = (idx, e) => {
        e?.stopPropagation();
        setCurrentIndex(idx);
    };

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    // Height class mappings
    const heightClasses = {
        compact: 'min-h-[380px] sm:min-h-[420px]',
        medium: 'min-h-[480px] sm:min-h-[540px]',
        tall: 'min-h-[580px] sm:min-h-[660px]',
        fullscreen: 'min-h-[85vh] sm:min-h-screen',
    };

    const paddingClasses = {
        none: 'py-0',
        sm: 'py-6 px-4',
        md: 'py-12 px-4 sm:px-6',
        lg: 'py-16 px-4 sm:px-8',
    };

    const bgClasses = {
        none: 'bg-transparent',
        muted: 'bg-slate-50 dark:bg-slate-900/50',
        glass: 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-y border-slate-200/50 dark:border-slate-800/50',
        dark: 'bg-slate-950 text-white',
        gradient: 'bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/30 text-white',
    };

    const currentSlide = activeSlides[currentIndex] || activeSlides[0];

    return (
        <section
            className={`w-full relative overflow-hidden transition-all duration-300 ${
                bgClasses[bgStyle] || bgClasses.none
            } ${paddingClasses[padding] || paddingClasses.none}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative w-full ${heightClasses[activeSettings.height || 'tall']} flex items-center justify-center overflow-hidden`}>
                {/* 1. HERO BANNER MODERN TEMPLATE */}
                {activeTemplate === 'hero_banner' && (
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                        {/* Background Media with Gradient Mask */}
                        {currentSlide.imageUrl && (
                            <img
                                key={`img-${currentIndex}`}
                                src={currentSlide.imageUrl}
                                alt={currentSlide.title || 'Slide Background'}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                    activeSettings.transition === 'zoom' ? 'scale-105 transition-transform duration-1000' : ''
                                } opacity-40`}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 dark:from-slate-950 dark:via-slate-950/80" />

                        {/* Slide Content */}
                        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-8 py-16 space-y-5 animate-fadeIn">
                            {currentSlide.badge && (
                                <div className="inline-block">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 backdrop-blur-md">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>{currentSlide.badge}</span>
                                    </span>
                                </div>
                            )}

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                {currentSlide.title}
                            </h1>

                            {currentSlide.subtitle && (
                                <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                    {currentSlide.subtitle}
                                </p>
                            )}

                            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                                {currentSlide.primaryButtonText && (
                                    <a
                                        href={currentSlide.primaryButtonUrl || '#'}
                                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                                    >
                                        <span>{currentSlide.primaryButtonText}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}
                                {currentSlide.secondaryButtonText && (
                                    <a
                                        href={currentSlide.secondaryButtonUrl || '#'}
                                        className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all inline-flex items-center gap-2"
                                    >
                                        <span>{currentSlide.secondaryButtonText}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. SPLIT CARD SHOWCASE TEMPLATE */}
                {activeTemplate === 'split_card' && (
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-7 space-y-5 animate-fadeIn">
                                {currentSlide.badge && (
                                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        {currentSlide.badge}
                                    </span>
                                )}
                                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                    {currentSlide.title}
                                </h2>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                                    {currentSlide.subtitle}
                                </p>
                                <div className="pt-2 flex items-center gap-3">
                                    {currentSlide.primaryButtonText && (
                                        <a
                                            href={currentSlide.primaryButtonUrl || '#'}
                                            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all inline-flex items-center gap-2"
                                        >
                                            <span>{currentSlide.primaryButtonText}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-5 animate-fadeIn">
                                <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/80 backdrop-blur-md relative aspect-[4/3] group">
                                    {currentSlide.imageUrl ? (
                                        <img
                                            src={currentSlide.imageUrl}
                                            alt={currentSlide.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                                            <ImageIcon className="w-16 h-16" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. TESTIMONIAL CAROUSEL TEMPLATE */}
                {activeTemplate === 'testimonial' && (
                    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 text-center space-y-6 relative z-10 animate-fadeIn">
                        <div className="flex justify-center text-amber-400 gap-1.5">
                            {[...Array(Number(currentSlide.rating) || 5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>

                        <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-white italic leading-relaxed max-w-3xl mx-auto">
                            "{currentSlide.quote}"
                        </blockquote>

                        <div className="flex items-center justify-center gap-3 pt-2">
                            {currentSlide.avatar && (
                                <img
                                    src={currentSlide.avatar}
                                    alt={currentSlide.author}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 shadow-lg shadow-indigo-500/20"
                                />
                            )}
                            <div className="text-left">
                                <div className="font-bold text-white text-base">{currentSlide.author}</div>
                                <div className="text-xs text-slate-400 font-medium">{currentSlide.role}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. MINIMAL FADE SHOWCASE TEMPLATE */}
                {activeTemplate === 'minimal_fade' && (
                    <div className="w-full h-full absolute inset-0 flex items-end justify-center">
                        {currentSlide.imageUrl && (
                            <img
                                src={currentSlide.imageUrl}
                                alt={currentSlide.title}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-60"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        <div className="relative z-10 w-full max-w-4xl mx-auto p-6 sm:p-8 mb-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">{currentSlide.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">{currentSlide.subtitle}</p>
                            </div>
                            {currentSlide.primaryButtonText && (
                                <a
                                    href={currentSlide.primaryButtonUrl || '#'}
                                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs whitespace-nowrap shadow-lg shadow-indigo-600/20"
                                >
                                    {currentSlide.primaryButtonText}
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Arrows Controls */}
                {activeSettings.showArrows !== false && slideCount > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/70 border border-slate-700/80 text-white hover:bg-slate-800 hover:scale-110 transition-all z-20 backdrop-blur-md shadow-xl"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-900/70 border border-slate-700/80 text-white hover:bg-slate-800 hover:scale-110 transition-all z-20 backdrop-blur-md shadow-xl"
                            aria-label="Next Slide"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </>
                )}

                {/* Pagination Dots */}
                {activeSettings.showDots !== false && slideCount > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                        {activeSlides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={(e) => handleDotClick(i, e)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    currentIndex === i
                                        ? 'w-8 bg-indigo-500 shadow-md shadow-indigo-500/50'
                                        : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export const SliderBuilderSettings = ({ props = {}, onChange }) => {
    const {
        source = 'custom',
        sliderId = '',
        template = 'hero_banner',
        settings = {},
        slides = [],
        bgStyle = 'none',
        padding = 'none',
    } = props;

    const [savedSlidersList, setSavedSlidersList] = useState([]);

    useEffect(() => {
        fetch('/api/sliders')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setSavedSlidersList(data);
                }
            })
            .catch(() => {});
    }, []);

    const updateSetting = (key, val) => {
        onChange('settings', {
            ...settings,
            [key]: val,
        });
    };

    const handleAddSlide = () => {
        const isTestimonial = template === 'testimonial';
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
                  badge: 'HIGHLIGHT',
                  title: 'New Slider Headline',
                  subtitle: 'Describe the core value and engaging offerings of your product.',
                  primaryButtonText: 'Explore More',
                  primaryButtonUrl: '#',
                  secondaryButtonText: 'Learn More',
                  secondaryButtonUrl: '#',
                  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
              };

        onChange('slides', [...slides, newSlide]);
    };

    const handleUpdateSlide = (idx, field, val) => {
        const newSlides = [...slides];
        newSlides[idx] = { ...newSlides[idx], [field]: val };
        onChange('slides', newSlides);
    };

    const handleRemoveSlide = (idx) => {
        if (slides.length <= 1) {
            alert('A slider must have at least 1 slide.');
            return;
        }
        onChange('slides', slides.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-5 text-xs">
            {/* Slider Data Source */}
            <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Slider Data Source
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => onChange('source', 'custom')}
                        className={`p-2 rounded-xl text-center font-medium border transition-all ${
                            source === 'custom'
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                    >
                        Custom Slides
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange('source', 'saved')}
                        className={`p-2 rounded-xl text-center font-medium border transition-all ${
                            source === 'saved'
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                    >
                        Saved CMS Slider
                    </button>
                </div>
            </div>

            {/* If Saved CMS Slider chosen */}
            {source === 'saved' ? (
                <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                            Choose Slider from CMS
                        </label>
                        <select
                            value={sliderId}
                            onChange={(e) => onChange('sliderId', e.target.value)}
                            className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white focus:border-indigo-500"
                        >
                            <option value="">-- Select a Saved Slider --</option>
                            {savedSlidersList.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.title} ({s.template})
                                </option>
                            ))}
                        </select>
                    </div>

                    <a
                        href="/admin/sliders"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] text-indigo-400 hover:underline"
                    >
                        <span>Open Slider Builder CMS Manager</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            ) : (
                /* Template & Settings for Custom Slides */
                <div className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                            Template Style
                        </label>
                        <select
                            value={template}
                            onChange={(e) => onChange('template', e.target.value)}
                            className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white focus:border-indigo-500"
                        >
                            <option value="hero_banner">Hero Banner Modern</option>
                            <option value="split_card">Split Card Showcase</option>
                            <option value="testimonial">Testimonial Carousel</option>
                            <option value="minimal_fade">Minimal Fade Showcase</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Autoplay</label>
                            <select
                                value={settings.autoplay !== false ? 'true' : 'false'}
                                onChange={(e) => updateSetting('autoplay', e.target.value === 'true')}
                                className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white"
                            >
                                <option value="true">Enabled</option>
                                <option value="false">Disabled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Interval</label>
                            <select
                                value={settings.interval || 5000}
                                onChange={(e) => updateSetting('interval', Number(e.target.value))}
                                className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white"
                            >
                                <option value={3000}>3 Seconds</option>
                                <option value={5000}>5 Seconds</option>
                                <option value={7000}>7 Seconds</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Height</label>
                            <select
                                value={settings.height || 'tall'}
                                onChange={(e) => updateSetting('height', e.target.value)}
                                className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white"
                            >
                                <option value="compact">Compact (380px)</option>
                                <option value="medium">Medium (500px)</option>
                                <option value="tall">Tall (650px)</option>
                                <option value="fullscreen">Fullscreen Hero</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-slate-400 mb-1">Arrows</label>
                            <select
                                value={settings.showArrows !== false ? 'true' : 'false'}
                                onChange={(e) => updateSetting('showArrows', e.target.value === 'true')}
                                className="w-full text-xs rounded-xl bg-slate-950 border-slate-800 text-white"
                            >
                                <option value="true">Show Arrows</option>
                                <option value="false">Hide Arrows</option>
                            </select>
                        </div>
                    </div>

                    {/* Slides List Manager */}
                    <div className="pt-2 border-t border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Slides ({slides.length})
                            </label>
                            <button
                                type="button"
                                onClick={handleAddSlide}
                                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Slide</span>
                            </button>
                        </div>

                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                            {slides.map((slide, idx) => (
                                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="font-semibold text-white">Slide #{idx + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSlide(idx)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {template === 'testimonial' ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Author"
                                                value={slide.author || ''}
                                                onChange={(e) => handleUpdateSlide(idx, 'author', e.target.value)}
                                                className="w-full text-xs rounded-lg bg-slate-900 border-slate-800 text-white"
                                            />
                                            <textarea
                                                rows={2}
                                                placeholder="Quote..."
                                                value={slide.quote || ''}
                                                onChange={(e) => handleUpdateSlide(idx, 'quote', e.target.value)}
                                                className="w-full text-xs rounded-lg bg-slate-900 border-slate-800 text-white"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={slide.title || ''}
                                                onChange={(e) => handleUpdateSlide(idx, 'title', e.target.value)}
                                                className="w-full text-xs rounded-lg bg-slate-900 border-slate-800 text-white font-medium"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Image URL"
                                                value={slide.imageUrl || ''}
                                                onChange={(e) => handleUpdateSlide(idx, 'imageUrl', e.target.value)}
                                                className="w-full text-xs rounded-lg bg-slate-900 border-slate-800 text-white"
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
