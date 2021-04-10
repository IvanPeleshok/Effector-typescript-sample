import React from 'react';
import './Body.scss';

export const CounterBody = (props: any) => {
    return (
        <div className="root__body">{props.children}</div>
    );
}