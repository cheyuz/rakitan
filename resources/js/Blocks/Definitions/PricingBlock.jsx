import React, { useState } from 'react';
import { Check, Sparkles, Plus, Trash2 } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

export const PricingComponent = ({ props = {}, blockId }) => {
    const {
        badge = 'TRANSPARENT PRICING',
        title = 'Simple, Predictable Plans for Everyone',
        subtitle = 'Choose the tier that fits your stage. No hidden fees or surprise upgrades.',
        annualDiscountBadge = 'Save 20%',
        plans = [
            {
                name: 'Starter',
                priceMonthly: '$19',
                priceAnnual: '$15',
                period: '/month',
                description: 'Perfect for indie hackers, bloggers, and personal projects.',
                features: [
                    'Up to 5 Rakitan Websites',
                    'All Core Puzzle Blocks',
                    'Standard Community Support',
                    '10GB Media Storage',
                ],
                isPopular: false,
                buttonText: 'Get Started',
                buttonUrl: '#',
            },
            {
                name: 'Professional',
                priceMonthly: '$49',
                priceAnnual: '$39',
                period: '/month',
                description: 'Ideal for growing businesses, digital creators, and teams.',
                features: [
                    'Unlimited Websites',
                    'All Puzzle Blocks & Addons',
                    'Custom Themes & Plugins',
                    'Priority Support',
                    '100GB Fast Cloud Storage',
                ],
                isPopular: true,
                buttonText: 'Start 14-Day Free Trial',
                buttonUrl: '#',
            },
            {
                name: 'Enterprise',
                priceMonthly: '$129',
                priceAnnual: '$99',
                period: '/month',
                description: 'For high-scale enterprises requiring custom SLAs and dedicated setups.',
                features: [
                    'Dedicated Infrastructure',
                    'Custom Block & Plugin SLA',
                    '24/7 Dedicated Account Rep',
                    'Unlimited Media Storage',
                    'White-label Branding',
                ],
                isPopular: false,
                buttonText: 'Contact Sales',
                buttonUrl: '#',
            },
        ],
        subComponents = [],
        isCustom = false,
    } = props;

    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full max-w-6xl mx-auto">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Pricing Kustom Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Badge Harga"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}
                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="Judul Pricing"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Judul Pricing"
                                        as="span"
                                    />
                                </h2>
                            </DefaultElementWrapper>
                            {(subtitle || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="subtitle"
                                    label="Subjudul"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base sm:text-lg text-slate-400">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Deskripsi paket harga..."
                                            multiline
                                            as="span"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}

                            {/* Billing Cycle Toggle */}
                            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsAnnual(false)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        !isAnnual
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Monthly Billing
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAnnual(true)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                                        isAnnual
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <span>Annual Billing</span>
                                    {annualDiscountBadge && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                                            {annualDiscountBadge}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <DefaultElementWrapper
                            blockId={blockId}
                            elementKey="plans"
                            label="Daftar Paket Harga"
                            isCustom={isCustom}
                        >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => {
                        const price = isAnnual && plan.priceAnnual ? plan.priceAnnual : plan.priceMonthly;

                        return (
                            <div
                                key={idx}
                                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                                    plan.isPopular
                                        ? 'bg-slate-900/90 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/40 lg:-translate-y-2'
                                        : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                                    <div className="my-6 flex items-baseline gap-1">
                                        <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                                        <span className="text-xs text-slate-400">{plan.period || '/month'}</span>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-slate-800/80">
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Included Features:</p>
                                        <ul className="space-y-2.5">
                                            {(plan.features || []).map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                                    <div className="w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-8 mt-8 border-t border-slate-800/80">
                                    <a
                                        href={plan.buttonUrl || '#'}
                                        className={`w-full py-3 rounded-xl font-semibold text-xs text-center block transition-all ${
                                            plan.isPopular
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                        }`}
                                    >
                                        {plan.buttonText || 'Select Plan'}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </DefaultElementWrapper>

                {/* Dynamic Sub-Components Slot pada Pricing Section */}
                <div className="w-full mt-12 max-w-2xl mx-auto">
                    <SubComponentSlot
                        blockId={blockId}
                        subComponents={subComponents}
                        emptyPlaceholder="+ Tambah Sub-Komponen ke Bagian Pricing"
                    />
                </div>
                </>
                )}
            </div>
        </section>
    );
};

export const PricingSettings = ({ props = {}, onChange }) => {
    const plans = props.plans || [];

    const updateProp = (key, val) => {
        onChange({ ...props, [key]: val });
    };

    const updatePlan = (index, field, value) => {
        const updated = [...plans];
        updated[index] = { ...updated[index], [field]: value };
        updateProp('plans', updated);
    };

    const addPlan = () => {
        const newPlan = {
            name: 'New Tier',
            priceMonthly: '$29',
            priceAnnual: '$24',
            period: '/month',
            description: 'Description for this plan.',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            isPopular: false,
            buttonText: 'Choose Plan',
            buttonUrl: '#',
        };
        updateProp('plans', [...plans, newPlan]);
    };

    const removePlan = (index) => {
        updateProp('plans', plans.filter((_, i) => i !== index));
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

            <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Pricing Tiers ({plans.length})</span>
                    <button
                        type="button"
                        onClick={addPlan}
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Tier</span>
                    </button>
                </div>

                {plans.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                value={p.name}
                                onChange={(e) => updatePlan(idx, 'name', e.target.value)}
                                className="font-bold bg-transparent text-white focus:outline-none border-b border-transparent focus:border-indigo-500 w-32"
                            />
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={p.isPopular || false}
                                        onChange={(e) => updatePlan(idx, 'isPopular', e.target.checked)}
                                        className="rounded border-slate-700 bg-slate-900 text-indigo-600"
                                    />
                                    <span>Popular</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removePlan(idx)}
                                    className="text-slate-500 hover:text-red-400 p-1"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-[10px] text-slate-500">Monthly Price</label>
                                <input
                                    type="text"
                                    value={p.priceMonthly || ''}
                                    onChange={(e) => updatePlan(idx, 'priceMonthly', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500">Annual Price</label>
                                <input
                                    type="text"
                                    value={p.priceAnnual || ''}
                                    onChange={(e) => updatePlan(idx, 'priceAnnual', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] text-slate-500">Features (one per line)</label>
                            <textarea
                                rows={3}
                                value={(p.features || []).join('\n')}
                                onChange={(e) => updatePlan(idx, 'features', e.target.value.split('\n').filter(Boolean))}
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-[11px]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
