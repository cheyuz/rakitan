import React from 'react';

export const SpacerComponent = ({ props = {} }) => {
    const {
        height = 'md',
        showDivider = true,
        dividerStyle = 'solid',
        dividerColor = '#6366f1',
    } = props;

    const heightClasses = {
        sm: 'h-8',
        md: 'h-16',
        lg: 'h-24',
        xl: 'h-32',
    }[height] || 'h-16';

    const borderStyles = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
    }[dividerStyle] || 'border-solid';

    return (
        <div className={`w-full flex items-center justify-center ${heightClasses} px-6`}>
            {showDivider ? (
                <div
                    className={`w-full max-w-5xl border-t ${borderStyles}`}
                    style={{ borderColor: dividerColor || '#e2e8f0' }}
                />
            ) : null}
        </div>
    );
};

export const SpacerSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tinggi Jarak (Height)</label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {[
                        { id: 'sm', label: '32px (SM)' },
                        { id: 'md', label: '64px (MD)' },
                        { id: 'lg', label: '96px (LG)' },
                        { id: 'xl', label: '128px (XL)' },
                    ].map((h) => (
                        <button
                            key={h.id}
                            type="button"
                            onClick={() => updateProps({ height: h.id })}
                            className={`py-1 rounded text-center text-xs font-medium transition-all ${
                                (props.height || 'md') === h.id
                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            {h.id.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-medium text-slate-700 dark:text-slate-300">Tampilkan Garis Pembatas (Divider)</span>
                <input
                    type="checkbox"
                    checked={Boolean(props.showDivider)}
                    onChange={(e) => updateProps({ showDivider: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800"
                />
            </div>

            {props.showDivider && (
                <>
                    <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Gaya Garis</label>
                        <select
                            value={props.dividerStyle || 'solid'}
                            onChange={(e) => updateProps({ dividerStyle: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="solid">Garis Lurus Solid (Solid)</option>
                            <option value="dashed">Garis Putus-putus (Dashed)</option>
                            <option value="dotted">Garis Titik-titik (Dotted)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Warna Garis</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={props.dividerColor || '#6366f1'}
                                onChange={(e) => updateProps({ dividerColor: e.target.value })}
                                className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                            />
                            <input
                                type="text"
                                value={props.dividerColor || '#6366f1'}
                                onChange={(e) => updateProps({ dividerColor: e.target.value })}
                                className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
