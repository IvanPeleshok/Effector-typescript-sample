import React from 'react';
import './Body.scss';

export const RootBody = (props: any) => {
    return (
        <div className="root__body">{props.children}</div>
    );
}