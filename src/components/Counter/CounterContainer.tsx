import React from 'react';
import { useStore } from 'effector-react';
import view from './CounterView';
import logic from './CounterLogic';
import { useEffect } from 'react';

export const CounterContainer = () => {
    let score = useStore(logic.$store);

    useEffect(() => {
    }, [score]);

    return (
        <view.container>
            <view.body>
                <view.button onClick={logic.dec} label={logic.decLabel} />
                <view.button onClick={() => logic.inc(1)} label={logic.incLabel} />
            </view.body>
            <view.body>
                <view.reset onClick={logic.reset} />
            </view.body>
            <view.score score={score} />
        </view.container>
    ) 
}
