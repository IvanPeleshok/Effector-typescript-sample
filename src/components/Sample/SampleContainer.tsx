import React from 'react';
import view from './SampleView';
import logic from './SampleLogic';
import { useStore } from 'effector-react';

export const SampleContainer = () => {
    let list: Array<string> = useStore(logic.$listValue);
    return (
        <view.container >
            <view.input onChange={logic.onChangeValue} onPressEnter={logic.onPressEnter}/>
                {list.map((el, i) => 
                    <view.item message={el} key={i} />
                )}
        </view.container>
    );
};