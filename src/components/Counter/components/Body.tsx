import React from 'react';
import './Body.scss';

export const CounterBody = (props) => {
    return (
        <div className="root__body">{props.children}</div>
    );
}