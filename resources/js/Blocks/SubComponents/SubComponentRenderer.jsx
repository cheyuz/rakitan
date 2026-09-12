import React, { useState } from 'react';
import {
    Sparkles,
    ArrowRight,
    ExternalLink,
    Download,
    CheckCircle2,
    Zap,
    ShieldCheck,
    Heart,
    Flame,
    Star,
    Trash2,
    Copy,
    ChevronUp,
    ChevronDown,
    Settings2,
    AlertCircle,
    Info,
    Check,
    X,
    GripVertical,
    Columns3,
} from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import InlineText from '@/Blocks/Components/InlineText';
import { useCanvasEdit } from '@/Blocks/Context/CanvasEditContext';
import SubComponentSlot from './SubComponentSlot';

// Helper icon resolver
const getIcon = (name, className = 'w-4 h-4') => {
    switch (name) {
        case 'ArrowRight':
            return <ArrowRight className={className} />;
        case 'Sparkles':
            return <Sparkles className={className} />;
        case 'ExternalLink':
            return <ExternalLink className={className} />;
        case 'Download':
            return <Download className={className} />;
        case 'CheckCircle2':
            return <CheckCircle2 className={className} />;
        case 'Zap':
            return <Zap className={className} />;
        case 'ShieldCheck':
            return <ShieldCheck className={className} />;
        case 'Heart':
            return <Heart className={className} />;
        case 'Flame':
            return <Flame className={className} />;
        case 'Star':
            return <Star className={className} />;
        default:
            return null;
    }
};

export default function SubComponentRenderer({
    subComponent,
    blockId,
    slotPath = null,
    isFirst = false,
    isLast = false,
}) {
    const {
        isEditing,
        onUpdateSubComponent,
        onRemoveSubComponent,
        onMoveSubComponent,
        onDuplicateSubComponent,
    } = useCanvasEdit();

    const [showQuickSettings, setShowQuickSettings] = useState(false);

    if (!subComponent) return null;

    const { id, type, props = {} } = subComponent;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const sortableStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        zIndex: isDragging ? 40 : 1,
    };

    const handlePropChange = (key, val) => {
        if (onUpdateSubComponent) {
            onUpdateSubComponent(blockId, id, { [key]: val }, slotPath);
        }
    };

    // Render Konten Spesifik Sub-Komponen
    const renderContent = () => {
        switch (type) {
            case 'sub_button': {
                const {
                    text = 'Klik Di Sini',
                    url = '#',
                    variant = 'primary',
                    size = 'md',
                    icon = 'ArrowRight',
                    targetBlank = false,
                } = props;

                const sizeClass = {
                    sm: 'px-3.5 py-1.5 text-xs',
                    md: 'px-5 py-2.5 text-sm',
                    lg: 'px-7 py-3.5 text-base',
                }[size] || 'px-5 py-2.5 text-sm';

                const variantClass = {
                    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25',
                    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
                    gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/25',
                    outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10',
                    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/60',
                }[variant] || 'bg-indigo-600 text-white';

                return (
                    <div className="inline-flex items-center">
                        <a
                            href={isEditing ? undefined : (url || '#')}
                            target={targetBlank ? '_blank' : undefined}
                            rel={targetBlank ? 'noreferrer' : undefined}
                            onClick={(e) => {
                                if (isEditing) e.preventDefault();
                            }}
                            className={`inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-95 ${sizeClass} ${variantClass}`}
                        >
                            <InlineText
                                value={text}
                                onChange={(val) => handlePropChange('text', val)}
                                placeholder="Button Text"
                            />
                            {getIcon(icon, size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')}
                        </a>
                    </div>
                );
            }

            case 'sub_badge': {
                const {
                    text = '✨ Fitur Baru',
                    color = 'indigo',
                    icon = 'Sparkles',
                    pill = true,
                } = props;

                const colorStyles = {
                    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
                    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                    slate: 'bg-slate-800/80 text-slate-300 border-slate-700',
                }[color] || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';

                return (
                    <div className="inline-block">
                        <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 border text-xs font-semibold backdrop-blur-sm shadow-sm ${
                                pill ? 'rounded-full' : 'rounded-lg'
                            } ${colorStyles}`}
                        >
                            {getIcon(icon, 'w-3.5 h-3.5')}
                            <InlineText
                                value={text}
                                onChange={(val) => handlePropChange('text', val)}
                                placeholder="Badge Text"
                            />
                        </div>
                    </div>
                );
            }

            case 'sub_text': {
                const {
                    text = 'Teks penjelasan tambahan',
                    variant = 'body',
                    align = 'left',
                    color = 'default',
                } = props;

                const variantStyles = {
                    h2: 'text-2xl sm:text-3xl font-bold tracking-tight',
                    h3: 'text-xl sm:text-2xl font-bold',
                    h4: 'text-lg sm:text-xl font-semibold',
                    lead: 'text-lg leading-relaxed font-normal',
                    body: 'text-sm sm:text-base leading-relaxed',
                    small: 'text-xs text-slate-400',
                }[variant] || 'text-base';

                const alignStyles = {
                    left: 'text-left',
                    center: 'text-center mx-auto',
                    right: 'text-right ml-auto',
                }[align] || 'text-left';

                const colorStyles = {
                    default: 'text-white',
                    muted: 'text-slate-400',
                    gradient: 'bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-extrabold',
                    indigo: 'text-indigo-400',
                }[color] || 'text-white';

                return (
                    <div className={`w-full ${alignStyles}`}>
                        <InlineText
                            value={text}
                            onChange={(val) => handlePropChange('text', val)}
                            as="div"
                            multiline={variant === 'body' || variant === 'lead'}
                            className={`${variantStyles} ${colorStyles}`}
                            placeholder="Write text here..."
                        />
                    </div>
                );
            }

            case 'sub_image': {
                const {
                    imageUrl = '',
                    alt = 'Gambar',
                    width = 'md',
                    rounded = 'xl',
                    shadow = true,
                    caption = '',
                } = props;

                const widthClass = {
                    sm: 'max-w-[160px]',
                    md: 'max-w-[320px]',
                    lg: 'max-w-[480px]',
                    full: 'w-full',
                }[width] || 'max-w-[320px]';

                const roundedClass = {
                    none: 'rounded-none',
                    md: 'rounded-xl',
                    xl: 'rounded-2xl',
                    full: 'rounded-full aspect-square object-cover',
                }[rounded] || 'rounded-2xl';

                return (
                    <div className={`inline-block ${widthClass}`}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={alt}
                                className={`w-full object-cover border border-slate-800 ${roundedClass} ${
                                    shadow ? 'shadow-2xl shadow-indigo-950/40' : ''
                                }`}
                            />
                        ) : (
                            <div className="w-full h-36 bg-slate-900/60 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 text-xs">
                                Masukkan URL Gambar
                            </div>
                        )}
                        {caption && (
                            <p className="text-xs text-slate-400 text-center mt-2 italic">{caption}</p>
                        )}
                    </div>
                );
            }

            case 'sub_icon': {
                const {
                    icon = 'Zap',
                    title = 'Kecepatan',
                    description = 'Performa kilat',
                    style = 'soft',
                } = props;

                const styleClass = {
                    soft: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
                    solid: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30',
                    outline: 'border-2 border-indigo-500 text-indigo-400',
                }[style] || 'bg-indigo-500/15 text-indigo-400';

                return (
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${styleClass}`}>
                            {getIcon(icon, 'w-5 h-5')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-white">
                                <InlineText
                                    value={title}
                                    onChange={(val) => handlePropChange('title', val)}
                                    placeholder="Icon Title"
                                />
                            </h5>
                            <p className="text-xs text-slate-400 mt-0.5">
                                <InlineText
                                    value={description}
                                    onChange={(val) => handlePropChange('description', val)}
                                    placeholder="Short caption"
                                />
                            </p>
                        </div>
                    </div>
                );
            }

            case 'sub_alert': {
                const {
                    type: alertType = 'info',
                    title = 'Pemberitahuan',
                    content = 'Keterangan isi alert.',
                } = props;

                const theme = {
                    info: {
                        bg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
                        icon: <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />,
                    },
                    success: {
                        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
                        icon: <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
                    },
                    warning: {
                        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
                        icon: <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />,
                    },
                    tip: {
                        bg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
                        icon: <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />,
                    },
                }[alertType] || {
                    bg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
                    icon: <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />,
                };

                return (
                    <div className={`p-4 rounded-2xl border flex items-start gap-3 backdrop-blur-sm ${theme.bg}`}>
                        <div className="mt-0.5">{theme.icon}</div>
                        <div className="flex-1 min-w-0">
                            {title && (
                                <h6 className="text-xs font-bold mb-1">
                                    <InlineText
                                        value={title}
                                        onChange={(val) => handlePropChange('title', val)}
                                        placeholder="Notice Title"
                                    />
                                </h6>
                            )}
                            <div className="text-xs leading-relaxed opacity-90">
                                <InlineText
                                    value={content}
                                    onChange={(val) => handlePropChange('content', val)}
                                    placeholder="Notice content details..."
                                    multiline
                                />
                            </div>
                        </div>
                    </div>
                );
            }

            case 'sub_rating': {
                const {
                    score = '4.9',
                    stars = 5,
                    count = '1,250+ Ulasan',
                    label = 'Rating Pelanggan',
                } = props;

                return (
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                        <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(Number(stars) || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                        </div>
                        <div className="h-4 w-px bg-slate-800" />
                        <div className="text-xs font-semibold text-white">
                            <InlineText
                                value={score}
                                onChange={(val) => handlePropChange('score', val)}
                                placeholder="4.9"
                            />
                            <span className="text-slate-400 font-normal ml-1.5">
                                (
                                <InlineText
                                    value={count}
                                    onChange={(val) => handlePropChange('count', val)}
                                    placeholder="1,250+ reviews"
                                />
                                )
                            </span>
                        </div>
                    </div>
                );
            }

            case 'sub_divider': {
                const { style = 'solid', text = '', spacing = 'md' } = props;

                const py = {
                    sm: 'py-2',
                    md: 'py-4',
                    lg: 'py-8',
                }[spacing] || 'py-4';

                if (text) {
                    return (
                        <div className={`w-full flex items-center gap-4 ${py}`}>
                            <div className="flex-1 h-px bg-slate-800" />
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                <InlineText
                                    value={text}
                                    onChange={(val) => handlePropChange('text', val)}
                                    placeholder="Divider Text"
                                />
                            </span>
                            <div className="flex-1 h-px bg-slate-800" />
                        </div>
                    );
                }

                if (style === 'gradient') {
                    return (
                        <div className={`w-full ${py}`}>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                        </div>
                    );
                }

                return (
                    <div className={`w-full ${py}`}>
                        <hr className={`border-slate-800 ${style === 'dashed' ? 'border-dashed' : ''}`} />
                    </div>
                );
            }

            case 'sub_card': {
                const {
                    title = 'Sorotan Utama',
                    description = 'Keterangan detail.',
                    bgStyle = 'slate',
                    padding = 'md',
                } = props;

                const bgClass = {
                    slate: 'bg-slate-900/60 border-slate-800',
                    dark: 'bg-slate-950/80 border-slate-900',
                    glass: 'bg-indigo-950/20 backdrop-blur-md border-indigo-500/20',
                }[bgStyle] || 'bg-slate-900/60 border-slate-800';

                const padClass = {
                    sm: 'p-4',
                    md: 'p-6',
                    lg: 'p-8',
                }[padding] || 'p-6';

                return (
                    <div className={`rounded-2xl border shadow-xl ${bgClass} ${padClass}`}>
                        <h4 className="text-base font-bold text-white mb-2">
                            <InlineText
                                value={title}
                                onChange={(val) => handlePropChange('title', val)}
                                placeholder="Card Title"
                            />
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <InlineText
                                value={description}
                                onChange={(val) => handlePropChange('description', val)}
                                placeholder="Card description..."
                                multiline
                            />
                        </p>
                    </div>
                );
            }

            case 'sub_spacer': {
                const { size = 'md' } = props;
                const hClass = {
                    sm: 'h-4',
                    md: 'h-8',
                    lg: 'h-16',
                    xl: 'h-24',
                }[size] || 'h-8';

                return (
                    <div className={`w-full ${hClass} ${isEditing ? 'bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded flex items-center justify-center text-[10px] text-indigo-400/60' : ''}`}>
                        {isEditing && <span>Spacer ({size})</span>}
                    </div>
                );
            }

            case 'sub_row': {
                const { columns = 2, gap = 'md', columnSlots = [] } = props;
                const colCount = Math.max(1, Math.min(4, Number(columns) || 2));
                const rawSlots = Array.isArray(columnSlots) ? columnSlots : [];
                const currentSlots = Array.from({ length: colCount }, (_, idx) => {
                    return rawSlots[idx] || { id: `col-${idx}`, subComponents: [] };
                });

                const gridColsClass = {
                    1: 'grid-cols-1',
                    2: 'grid-cols-1 md:grid-cols-2',
                    3: 'grid-cols-1 md:grid-cols-3',
                    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
                }[colCount] || 'grid-cols-1 md:grid-cols-2';

                const gapClass = {
                    sm: 'gap-3',
                    md: 'gap-5',
                    lg: 'gap-8',
                }[gap] || 'gap-5';

                return (
                    <div className={`w-full grid ${gridColsClass} ${gapClass} my-2`}>
                        {currentSlots.map((col, cIdx) => (
                            <div
                                key={col.id || cIdx}
                                className={`flex flex-col min-w-0 transition-all ${
                                    isEditing
                                        ? 'p-2.5 sm:p-3 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 hover:border-indigo-500/50 shadow-sm'
                                        : ''
                                }`}
                            >
                                {isEditing && (
                                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
                                        <span className="font-semibold text-slate-300">Column #{cIdx + 1}</span>
                                        <span>{col.subComponents?.length || 0} item{col.subComponents?.length === 1 ? '' : 's'}</span>
                                    </div>
                                )}
                                <SubComponentSlot
                                    blockId={blockId}
                                    subComponents={col.subComponents || []}
                                    slotPath={{ parentSubId: id, columnIndex: cIdx }}
                                    emptyPlaceholder={`+ Add to Column ${cIdx + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                );
            }

            default:
                return null;
        }
    };

    // Jika bukan di mode editing (di publik), cukup render konten
    if (!isEditing) {
        return <div className="sub-component-item">{renderContent()}</div>;
    }

    // Builder Mode: bungkus dengan hover action toolbar & DnD Sortable
    return (
        <div
            ref={setNodeRef}
            style={sortableStyle}
            className="group/sub relative my-1 rounded-xl transition-all duration-150 ring-1 ring-transparent hover:ring-indigo-500/40 hover:bg-indigo-500/5 p-1"
        >
            {/* Quick Action Floating Bar saat hover */}
            <div className="absolute -top-3.5 right-2 opacity-0 group-hover/sub:opacity-100 transition-opacity z-30 flex items-center gap-1 bg-slate-900 border border-slate-700/80 shadow-xl rounded-lg p-0.5 backdrop-blur-md">
                {/* Drag Handle */}
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-grab active:cursor-grabbing transition-colors"
                    title="Drag to reorder"
                >
                    <GripVertical className="w-3 h-3" />
                </button>

                {/* Move Up */}
                <button
                    type="button"
                    disabled={isFirst}
                    onClick={(e) => {
                        e.stopPropagation();
                        onMoveSubComponent(blockId, id, 'up', slotPath);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                    title="Move Up"
                >
                    <ChevronUp className="w-3 h-3" />
                </button>

                {/* Move Down */}
                <button
                    type="button"
                    disabled={isLast}
                    onClick={(e) => {
                        e.stopPropagation();
                        onMoveSubComponent(blockId, id, 'down', slotPath);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                    title="Move Down"
                >
                    <ChevronDown className="w-3 h-3" />
                </button>

                {/* Quick Setting */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowQuickSettings(!showQuickSettings);
                    }}
                    className={`p-1 rounded transition-colors ${
                        showQuickSettings ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title="Style Settings"
                >
                    <Settings2 className="w-3 h-3" />
                </button>

                {/* Duplicate */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateSubComponent(blockId, id, slotPath);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                    title="Duplicate"
                >
                    <Copy className="w-3 h-3" />
                </button>

                {/* Delete */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSubComponent(blockId, id, slotPath);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800"
                    title="Delete"
                >
                    <Trash2 className="w-3 h-3" />
                </button>
            </div>

            {/* Quick Settings Popover */}
            {showQuickSettings && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-6 right-0 z-40 w-64 p-3 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-xs text-slate-200"
                >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 font-bold">
                        <span>Sub-Component Settings</span>
                        <button
                            type="button"
                            onClick={() => setShowQuickSettings(false)}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>

                    {type === 'sub_button' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Target URL / Link</label>
                                <input
                                    type="text"
                                    value={props.url || ''}
                                    onChange={(e) => handlePropChange('url', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1">Style Variant</label>
                                    <select
                                        value={props.variant || 'primary'}
                                        onChange={(e) => handlePropChange('variant', e.target.value)}
                                        className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                    >
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="gradient">Gradient</option>
                                        <option value="outline">Outline</option>
                                        <option value="ghost">Ghost</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1">Size</label>
                                    <select
                                        value={props.size || 'md'}
                                        onChange={(e) => handlePropChange('size', e.target.value)}
                                        className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                    >
                                        <option value="sm">Small</option>
                                        <option value="md">Medium</option>
                                        <option value="lg">Large</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'sub_badge' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Color Theme</label>
                                <select
                                    value={props.color || 'indigo'}
                                    onChange={(e) => handlePropChange('color', e.target.value)}
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                >
                                    <option value="indigo">Indigo</option>
                                    <option value="emerald">Emerald Green</option>
                                    <option value="amber">Amber Orange</option>
                                    <option value="rose">Rose Red</option>
                                    <option value="purple">Modern Purple</option>
                                    <option value="blue">Sky Blue</option>
                                    <option value="slate">Neutral Slate</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Icon</label>
                                <select
                                    value={props.icon || 'Sparkles'}
                                    onChange={(e) => handlePropChange('icon', e.target.value)}
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                >
                                    <option value="Sparkles">Sparkles ✨</option>
                                    <option value="Zap">Zap ⚡</option>
                                    <option value="ShieldCheck">Shield 🛡️</option>
                                    <option value="Flame">Flame 🔥</option>
                                    <option value="Heart">Heart ❤️</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {type === 'sub_image' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={props.imageUrl || ''}
                                    onChange={(e) => handlePropChange('imageUrl', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1">Width</label>
                                    <select
                                        value={props.width || 'md'}
                                        onChange={(e) => handlePropChange('width', e.target.value)}
                                        className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                    >
                                        <option value="sm">Small</option>
                                        <option value="md">Medium</option>
                                        <option value="lg">Large</option>
                                        <option value="full">Full Width</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-400 mb-1">Corner Radius</label>
                                    <select
                                        value={props.rounded || 'xl'}
                                        onChange={(e) => handlePropChange('rounded', e.target.value)}
                                        className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                    >
                                        <option value="none">Square</option>
                                        <option value="md">Medium Rounded</option>
                                        <option value="xl">Smooth Rounded</option>
                                        <option value="full">Circle / Pill</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'sub_alert' && (
                        <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Callout Type</label>
                            <select
                                value={props.type || 'info'}
                                onChange={(e) => handlePropChange('type', e.target.value)}
                                className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                            >
                                <option value="info">Info (Blue)</option>
                                <option value="success">Success (Green)</option>
                                <option value="warning">Warning (Yellow)</option>
                                <option value="tip">Tip / Feature (Purple)</option>
                            </select>
                        </div>
                    )}

                    {type === 'sub_divider' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Line Style</label>
                                <select
                                    value={props.style || 'solid'}
                                    onChange={(e) => handlePropChange('style', e.target.value)}
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                >
                                    <option value="solid">Solid Line</option>
                                    <option value="dashed">Dashed Line</option>
                                    <option value="gradient">Smooth Gradient</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {type === 'sub_spacer' && (
                        <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Spacer Height</label>
                            <select
                                value={props.size || 'md'}
                                onChange={(e) => handlePropChange('size', e.target.value)}
                                className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                            >
                                <option value="sm">Small (16px)</option>
                                <option value="md">Medium (32px)</option>
                                <option value="lg">Large (64px)</option>
                                <option value="xl">Extra Large (96px)</option>
                            </select>
                        </div>
                    )}

                    {type === 'sub_row' && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Columns Count</label>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {[1, 2, 3, 4].map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => {
                                                const currentSlots = Array.isArray(props.columnSlots) ? props.columnSlots : [];
                                                const newSlots = Array.from({ length: num }, (_, idx) => {
                                                    return currentSlots[idx] || { id: `col-${idx}`, subComponents: [] };
                                                });
                                                handlePropChange('columns', num);
                                                handlePropChange('columnSlots', newSlots);
                                            }}
                                            className={`py-1 rounded text-center text-xs font-bold transition-colors ${
                                                Number(props.columns || 2) === num
                                                    ? 'bg-indigo-600 text-white shadow-sm'
                                                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                            }`}
                                        >
                                            {num} Col{num > 1 ? 's' : ''}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Column Gap</label>
                                <select
                                    value={props.gap || 'md'}
                                    onChange={(e) => handlePropChange('gap', e.target.value)}
                                    className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white"
                                >
                                    <option value="sm">Compact (Small)</option>
                                    <option value="md">Standard (Medium)</option>
                                    <option value="lg">Wide (Large)</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Render Komponen Nyata */}
            {renderContent()}
        </div>
    );
}
