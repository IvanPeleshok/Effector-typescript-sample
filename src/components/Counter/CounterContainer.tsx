import React from 'react';
import { useStore } from 'effector-react';
import view from './CounterView';
import logic from './CounterLogic';

export const CounterContainer = () => {
    let score = useStore(logic.$store);

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

        // <view.container>
        // <view.body>
        //     <view.button onClick={logic.api.dec} label={logic.decLabel} />
        //     <view.button onClick={() => logic.api.inc(1)} label={logic.incLabel} />
        // </view.body>
        // <view.body>
        //     <view.reset onClick={logic.api.reset} />
        // </view.body>
        // <view.score score={score} />
        // </view.container>
    ) 
}
