import React from 'react';
import view from './ReposView';
import logic from './ReposLogic';
import { useStore } from 'effector-react';
import { useEffect } from 'react';

export const ReposContainer = () => {
    const list = useStore(logic.$store);
    
    useEffect(() => {
        logic.init();
    }, []);

    return (
        <view.container>
            <view.input label={logic.label} onSubmit={logic.submitForm}/>
            {list?.map((item, i) => (
                <view.item text={item.name} key={i} />
            ))}
        </view.container>
    );
};