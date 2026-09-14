import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import InlineText from '@/Blocks/Components/InlineText';
import SubComponentSlot from '@/Blocks/SubComponents/SubComponentSlot';
import DefaultElementWrapper from '@/Blocks/Components/DefaultElementWrapper';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';

/**
 * Clean Light Theme Override: TestimonialsBlock
 *
 * Modern editorial review cards with subtle borders, double-ringed avatars,
 * and warm star ratings on a clean white background.
 */
export default function TestimonialsBlock({ props = {}, blockId }) {
    const {
        badge = 'COMMUNITY LOVES RAKITAN',
        title = 'Trusted by Builders, Loved by Creators',
        subtitle = 'Here is how creators and development teams are building faster with Rakitan CMS.',
        columns = 3,
        items = [
            {
                quote: 'Rakitan completely changed our agency workflow. We assemble high-converting landing pages for clients in record time without touching boilerplate code.',
                author: 'Sarah Jenkins',
                role: 'Founder at PixelCraft Studio',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                rating: 5,
            },
            {
                quote: 'Building custom puzzle blocks is a breeze. It took us less than 20 minutes to ship a custom pricing calculator block for our client.',
                author: 'David Chen',
                role: 'Full-Stack Developer',
                avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                rating: 5,
            },
            {
                quote: 'The modular theme system and media library feel so clean and intuitive. The UI design is stunning right out of the box.',
                author: 'Elena Rostova',
                role: 'UI/UX Lead at StudioPixel',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                rating: 5,
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

    const handleItemChange = (idx, field, val) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        handlePropChange('items', newItems);
    };

    const gridColsClass = {
        1: 'grid-cols-1 max-w-2xl mx-auto',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {isCustom ? (
                    <div className="w-full max-w-6xl mx-auto">
                        <SubComponentSlot
                            blockId={blockId}
                            subComponents={subComponents}
                            emptyPlaceholder="+ Tambahkan Sub-Komponen ke Testimoni Light Ini"
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
                                        <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-600" />
                                        <InlineText
                                            value={badge}
                                            onChange={(val) => handlePropChange('badge', val)}
                                            placeholder="Testimonials Badge"
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
                                        placeholder="Section Heading"
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
                                    <p className="text-base sm:text-lg text-slate-600">
                                        <InlineText
                                            value={subtitle}
                                            onChange={(val) => handlePropChange('subtitle', val)}
                                            placeholder="Section Subtitle"
                                        />
                                    </p>
                                </DefaultElementWrapper>
                            )}
                        </div>

                        {/* Testimonials Cards Grid */}
                        <div className={`grid ${gridColsClass} gap-8`}>
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-200 hover:bg-white shadow-xs hover:shadow-lg transition-all duration-300"
                                >
                                    <div>
                                        {/* Stars */}
                                        <div className="flex items-center gap-1 mb-5">
                                            {[...Array(item.rating || 5)].map((_, sIdx) => (
                                                <Star
                                                    key={sIdx}
                                                    className="w-4 h-4 fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>

                                        {/* Quote Text */}
                                        <p className="text-slate-700 italic font-normal text-sm leading-relaxed mb-6">
                                            “
                                            <InlineText
                                                value={item.quote}
                                                onChange={(val) => handleItemChange(idx, 'quote', val)}
                                                placeholder="Write testimonial quote..."
                                                multiline
                                                as="span"
                                            />
                                            ”
                                        </p>
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-3.5 pt-5 border-t border-slate-200/60">
                                        {item.avatarUrl && (
                                            <img
                                                src={item.avatarUrl}
                                                alt={item.author}
                                                className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs"
                                            />
                                        )}
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900">
                                                <InlineText
                                                    value={item.author}
                                                    onChange={(val) => handleItemChange(idx, 'author', val)}
                                                    placeholder="Author Name"
                                                />
                                            </h4>
                                            <p className="text-xs font-semibold text-indigo-600">
                                                <InlineText
                                                    value={item.role}
                                                    onChange={(val) => handleItemChange(idx, 'role', val)}
                                                    placeholder="Author Role"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
