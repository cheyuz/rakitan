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
                    style={{ borderColor: dividerColor || '#334155' }}
                />
            ) : null}
        </div>
    );
};

export const SpacerSettings = ({ props, updateProps }) => {
    return (
        <div className="space-y-4 text-xs">
            <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Vertical Height</label>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                    {[
                        { id: 'sm', label: '32px' },
                        { id: 'md', label: '64px' },
                        { id: 'lg', label: '96px' },
                        { id: 'xl', label: '128px' },
                    ].map((h) => (
                        <button
                            key={h.id}
                            type="button"
                            onClick={() => updateProps({ height: h.id })}
                            className={`py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
                                (props.height || 'md') === h.id
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                            }`}
                        >
                            {h.id.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Show Divider Line</span>
                <input
                    type="checkbox"
                    checked={Boolean(props.showDivider)}
                    onChange={(e) => updateProps({ showDivider: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-700 bg-slate-900 cursor-pointer"
                />
            </div>

            {props.showDivider && (
                <>
                    <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Divider Style</label>
                        <select
                            value={props.dividerStyle || 'solid'}
                            onChange={(e) => updateProps({ dividerStyle: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        >
                            <option value="solid">Solid Line</option>
                            <option value="dashed">Dashed Line</option>
                            <option value="dotted">Dotted Line</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Line Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={props.dividerColor || '#6366f1'}
                                onChange={(e) => updateProps({ dividerColor: e.target.value })}
                                className="w-9 h-9 rounded-xl border border-slate-700 cursor-pointer p-0.5 bg-slate-900"
                            />
                            <input
                                type="text"
                                value={props.dividerColor || '#6366f1'}
                                onChange={(e) => updateProps({ dividerColor: e.target.value })}
                                className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 border border-slate-700/80 text-white outline-none"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
