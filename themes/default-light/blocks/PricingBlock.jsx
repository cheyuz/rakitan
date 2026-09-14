import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * Clean Light Theme Override: PricingBlock
 *
 * Polished minimalist cards, delicate indigo highlights for popular plans,
 * soft ambient shadows, and clear visual tiering.
 */
export default function PricingBlock({ props = {}, blockId }) {
    const {
        badge = 'TRANSPARENT PRICING',
        title = 'Choose the Perfect Plan for Your Growth',
        subtitle = 'Fair and flexible pricing. No hidden fees. Cancel anytime.',
        billingCycle = 'monthly',
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

    const [billing, setBilling] = useState(billingCycle || 'monthly');
    const { onUpdateBlockProp, isEditing } = useCanvasEdit();

    const handlePropChange = (key, val) => {
        if (onUpdateBlockProp && blockId) {
            onUpdateBlockProp(blockId, key, val);
        }
    };

    const handlePlanChange = (planIdx, field, val) => {
        const newPlans = [...plans];
        newPlans[planIdx] = { ...newPlans[planIdx], [field]: val };
        handlePropChange('plans', newPlans);
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full max-w-6xl mx-auto">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Blok Pricing Light Ini"
                        />
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            {(badge || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="badge"
                                    label="Badge"
                                    isCustom={isCustom}
                                >
                                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 shadow-xs">
                                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Pricing Badge"
                                        />
                                    </div>
                                </DefaultElementWrapper>
                            )}

                            <DefaultElementWrapper
                                blockId={blockId}
                                elementKey="title"
                                label="Title"
                                isCustom={isCustom}
                            >
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Section Title"
                                    />
                                </h2>
                            </DefaultElementWrapper>

                            {(subtitle || isEditing) && (
                                <DefaultElementWrapper
                                    blockId={blockId}
                                    elementKey="subtitle"
                                    label="Subtitle"
                                    isCustom={isCustom}
                                >
                                    <p className="text-base sm:text-lg text-slate-600 mb-8">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Section Subtitle"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}

                            {/* Billing Cycle Toggle */}
                            <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200 shadow-xs">
                                <button
                                    type="button"
                                    onClick={() => setBilling('monthly')}
                                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                                        billing === 'monthly'
                                            ? 'bg-indigo-600 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Monthly Billing
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBilling('annual')}
                                    className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                                        billing === 'annual'
                                            ? 'bg-indigo-600 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    <span>Annual Billing</span>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                        billing === 'annual'
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                        Save 20%
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {plans.map((plan, idx) => {
                                const isPopular = plan.isPopular;
                                const displayPrice = billing === 'annual' ? plan.priceAnnual : plan.priceMonthly;

                                return (
                                    <div
                                        key={idx}
                                        className={`flex flex-col rounded-3xl p-8 sm:p-9 transition-all duration-300 relative ${
                                            isPopular
                                                ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-600/10 lg:-translate-y-2'
                                                : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
                                        }`}
                                    >
                                        {isPopular && (
                                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                                                Most Popular
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-slate-950 mb-2">
                                                <InlineText
                                                    value={plan.name}
                                                    onChange={(val) => handlePlanChange(idx, 'name', val)}
                                                    placeholder="Plan Name"
                                                />
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed min-h-[40px]">
                                                <InlineText
                                                    value={plan.description}
                                                    onChange={(val) => handlePlanChange(idx, 'description', val)}
                                                    placeholder="Short plan description"
                                                    multiline
                                                />
                                            </p>
                                        </div>

                                        <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-slate-100">
                                            <span className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                                                {displayPrice}
                                            </span>
                                            <span className="text-sm font-medium text-slate-500">
                                                {plan.period || '/month'}
                                            </span>
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-3.5 mb-8 flex-1">
                                            {(plan.features || []).map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700">
                                                    <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                                    </div>
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Button */}
                                        <a
                                            href={isEditing ? undefined : (plan.buttonUrl || '#')}
                                            onClick={(e) => {
                                                if (isEditing) e.preventDefault();
                                            }}
                                            className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
                                                isPopular
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 active:scale-95'
                                                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200/90 active:scale-95'
                                            }`}
                                        >
                                            <InlineText
                                                value={plan.buttonText || 'Choose Plan'}
                                                onChange={(val) => handlePlanChange(idx, 'buttonText', val)}
                                                placeholder="Button Text"
                                            />
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
