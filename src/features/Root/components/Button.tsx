import React from 'react';
import './Button.scss';

interface IRootButton {
    label?: string;
    onClick?: () => void;
};

export const RootButton = (props: IRootButton) => {
    return (
        <div className="root__button" onClick={props.onClick}>
            <span className="root__button__label">{props.label}</span>
        </div>
    );
};