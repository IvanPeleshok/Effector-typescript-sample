import React from 'react';
import view from './SimpleView';
import logic from './SimpleLogic';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const SimpleContainer = () => {
    const store = useStore(logic.$store);
    
    useEffect(() => {
        logic.init();
    }, []);

    return (
        <view.button label="Forward" onClick={() => logic.click(store + store)} />
    );
};