import React, { ReactNode } from 'react';
import './Container.scss';

interface RootContainer {
    children: ReactNode;
}

export const RootContainer = (props: RootContainer) => {
    return (
        <div className="root__container">{props.children}</div>
    );
};