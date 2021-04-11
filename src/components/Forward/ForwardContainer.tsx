import React from 'react';
import view from './ForwardView';
import logic from './ForwardLogic';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const ForwardContainer = () => {
    const list = useStore(logic.$store);
    
    useEffect(() => {
        logic.init();
    }, []);

    return (
        <view.container>
            <view.input label={logic.label} onSubmit={logic.submitForm}/>
            {list?.map((item, i) => (
                <view.itemOfList text={item.name} key={i} />
            ))}
        </view.container>
    );
};