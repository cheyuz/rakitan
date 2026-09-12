import React, { createContext, useContext } from 'react';

export const CanvasEditContext = createContext({
    isEditing: false,
    selectedBlockId: null,
    selectedSubComponentId: null,
    onSelectBlock: () => {},
    onSelectSubComponent: () => {},
    onUpdateBlockProp: () => {},
    onUpdateSubComponent: () => {},
    onAddSubComponent: () => {},
    onRemoveSubComponent: () => {},
    onMoveSubComponent: () => {},
    onDuplicateSubComponent: () => {},
    onReorderSubComponents: () => {},
    onConvertBlockToCustom: () => {},
    onResetBlockToDefault: () => {},
});

export const useCanvasEdit = () => useContext(CanvasEditContext);

export const CanvasEditProvider = ({ children, value }) => {
    return (
        <CanvasEditContext.Provider value={value}>
            {children}
        </CanvasEditContext.Provider>
    );
};
