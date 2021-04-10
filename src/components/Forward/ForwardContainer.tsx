import React from 'react';
import view from './ForwardView';
import logic from './ForwardLogic';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const ForwardContainer = () => {
    const store = useStore(logic.$store);
    
    useEffect(() => {
        logic.init();
    }, []);

    return (
        <view.button label="Forward" onClick={() => logic.click(store + store)} />
    );
};