import React from 'react';
import view from './ListView';
import logic from './ListLogic';
import { useStore } from 'effector-react';

export const ListContainer = () => {
    let list = useStore(logic.$listValue);
    return (
        <view.container >
            <view.input onChange={logic.onChangeValue} onSubmit={logic.onPressEnter}/>
                {list.map((el, i) => 
                    <view.item text={el} key={i} />
                )}
        </view.container>
    );
};