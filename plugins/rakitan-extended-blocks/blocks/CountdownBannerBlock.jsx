import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Flame, Clock, Copy, Check, ArrowRight, Tag, Gift } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const CountdownBannerComponent = ({ props = {}, blockId }) => {
    const {
        badge = '🔥 LIMITED TIME SPECIAL PROMO',
        title = 'Unlock 40% Off Pro Lifetime Access',
        subtitle = 'Supercharge your web engineering stack with full access to all extended block suites, starter kits, and priority updates. Offer expires when the timer hits zero!',
        targetDate = '2026-12-31T23:59:59',
        promoCode = 'RAKITAN40',
        discountTag = '40% OFF',
        buttonText = 'Claim Special Offer',
        buttonUrl = '#pricing',
        secondaryText = 'View Feature Breakdown',
        secondaryUrl = '#features',
        bgStyle = 'gradient',
        padding = 'lg',
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();
    const [copied, setCopied] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: '03',
        hours: '14',
        minutes: '45',
        seconds: '20',
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                    hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                    minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
                    seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
                });
            } else {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handleCopyPromo = () => {
        if (navigator?.clipboard?.writeText && promoCode) {
            navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const padClasses = {
        sm: 'py-8 px-4',
        md: 'py-12 px-4 sm:px-6',
        lg: 'py-16 px-4 sm:px-6 lg:px-8',
    };

    const bgClasses = {
        dark: 'bg-slate-950 text-white border-y border-slate-800',
        gradient: 'bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 text-white border-y border-indigo-800/40',
        brand: 'bg-indigo-600 text-white',
        glass: 'bg-white/40 dark:bg-slate-900/60 backdrop-blur-xl border-y border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white',
    };

    return (
        <section className={`${bgClasses[bgStyle] || bgClasses.gradient} ${padClasses[padding] || padClasses.lg} relative overflow-hidden`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                {badge && (
                    <div className="inline-block mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 shadow-sm">
                            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <InlineText
                                value={badge}
                                onChange={(val) => handlePropChange('badge', val)}
                                isEditable={isEditing}
                            />
                        </span>
                    </div>
                )}

                {title && (
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
                        <InlineText
                            value={title}
                            onChange={(val) => handlePropChange('title', val)}
                            isEditable={isEditing}
                        />
                    </h2>
                )}

                {subtitle && (
                    <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                        <InlineText
                            value={subtitle}
                            onChange={(val) => handlePropChange('subtitle', val)}
                            isEditable={isEditing}
                        />
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
                    {[
                        { label: 'DAYS', val: timeLeft.days },
                        { label: 'HOURS', val: timeLeft.hours },
                        { label: 'MINUTES', val: timeLeft.minutes },
                        { label: 'SECONDS', val: timeLeft.seconds },
                    ].map((box, i) => (
                        <div
                            key={i}
                            className="w-20 sm:w-24 py-3 sm:py-4 px-2 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-lg flex flex-col items-center"
                        >
                            <span className="text-2xl sm:text-4xl font-black tracking-tight text-white font-mono">
                                {box.val}
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-300 mt-1">
                                {box.label}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {promoCode && (
                        <div
                            onClick={handleCopyPromo}
                            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md cursor-pointer transition-all active:scale-95 group"
                            title="Click to copy promo code"
                        >
                            <Tag className="w-4 h-4 text-amber-300" />
                            <span className="text-xs font-mono font-bold tracking-wider text-white">
                                {promoCode}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-400 text-slate-900 font-bold">
                                {discountTag}
                            </span>
                            <button
                                type="button"
                                className="text-white/70 group-hover:text-white transition-colors"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-emerald-400" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    )}

                    {buttonText && (
                        <a
                            href={buttonUrl || '#'}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 hover:shadow-2xl transition-all"
                            onClick={(e) => isEditing && e.preventDefault()}
                        >
                            <InlineText
                                value={buttonText}
                                onChange={(val) => handlePropChange('buttonText', val)}
                                isEditable={isEditing}
                            />
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    )}

                    {secondaryText && (
                        <a
                            href={secondaryUrl || '#'}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all"
                            onClick={(e) => isEditing && e.preventDefault()}
                        >
                            <InlineText
                                value={secondaryText}
                                onChange={(val) => handlePropChange('secondaryText', val)}
                                isEditable={isEditing}
                            />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export const CountdownBannerSettings = ({ props = {}, updateProps, onChange }) => {
    const handleFieldChange = (key, val) => {
        if (typeof onChange === 'function') onChange(key, val);
        if (typeof updateProps === 'function') updateProps({ [key]: val });
    };

    const {
        badge = '',
        title = '',
        subtitle = '',
        targetDate = '2026-12-31T23:59:59',
        promoCode = '',
        discountTag = '',
        buttonText = '',
        buttonUrl = '',
        secondaryText = '',
        secondaryUrl = '',
        bgStyle = 'gradient',
        padding = 'lg',
    } = props;

    return (
        <div className="space-y-5 text-xs">
            <div>
                <label className="block font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Banner Content
                </label>
                <div className="space-y-2.5">
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Badge Label</label>
                        <input
                            type="text"
                            placeholder="e.g. FLASH SALE - LIMITED TIME"
                            value={badge}
                            onChange={(e) => handleFieldChange('badge', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Main Heading</label>
                        <input
                            type="text"
                            placeholder="Main title"
                            value={title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500 font-semibold"
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Subtitle / Description</label>
                        <textarea
                            placeholder="Subtitle description"
                            value={subtitle}
                            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
                <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                        Expiry Date & Time (ISO format)
                    </label>
                    <input
                        type="datetime-local"
                        value={targetDate ? targetDate.substring(0, 16) : ''}
                        onChange={(e) => handleFieldChange('targetDate', e.target.value ? `${e.target.value}:00` : '')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block font-semibold text-slate-300 mb-1">Promo Code</label>
                        <input
                            type="text"
                            placeholder="e.g. FLASH40"
                            value={promoCode}
                            onChange={(e) => handleFieldChange('promoCode', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-300 mb-1">Discount Tag</label>
                        <input
                            type="text"
                            placeholder="e.g. 40% OFF"
                            value={discountTag}
                            onChange={(e) => handleFieldChange('discountTag', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block font-semibold text-slate-300 mb-1">Background Style</label>
                        <select
                            value={bgStyle}
                            onChange={(e) => handleFieldChange('bgStyle', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        >
                            <option value="gradient">Deep Gradient Glow</option>
                            <option value="dark">Solid Dark</option>
                            <option value="brand">Brand Indigo</option>
                            <option value="glass">Glassmorphism</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-300 mb-1">Padding</label>
                        <select
                            value={padding}
                            onChange={(e) => handleFieldChange('padding', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        >
                            <option value="sm">Compact (sm)</option>
                            <option value="md">Normal (md)</option>
                            <option value="lg">Spacious (lg)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
                <label className="block font-bold text-slate-400 uppercase tracking-wider">
                    Call To Action Buttons
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Primary Button Text</label>
                        <input
                            type="text"
                            placeholder="Button Text"
                            value={buttonText}
                            onChange={(e) => handleFieldChange('buttonText', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Primary Button URL</label>
                        <input
                            type="text"
                            placeholder="URL"
                            value={buttonUrl}
                            onChange={(e) => handleFieldChange('buttonUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Secondary Button Text</label>
                        <input
                            type="text"
                            placeholder="Secondary Text"
                            value={secondaryText}
                            onChange={(e) => handleFieldChange('secondaryText', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-slate-400 mb-1">Secondary Button URL</label>
                        <input
                            type="text"
                            placeholder="URL"
                            value={secondaryUrl}
                            onChange={(e) => handleFieldChange('secondaryUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
