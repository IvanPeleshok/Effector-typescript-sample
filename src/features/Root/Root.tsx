import React from 'react';
import { useStore } from 'effector-react';
import view from './RootView';
import logic from './RootLogic';

export const Root = () => {
    let score = useStore(logic.$store);
    return (
        <view.container>
            <view.body>
                <view.button onClick={logic.dec} label={logic.decLabel} />
                <view.button onClick={() => logic.inc(1)} label={logic.incLabel} />
            </view.body>
            <view.score score={score} />
        </view.container>
    ) 
}