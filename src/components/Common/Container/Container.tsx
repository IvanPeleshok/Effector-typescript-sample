import React, { ReactNode } from 'react';
import './Container.scss';

interface IContainer {
    children: ReactNode;
}

export const Container = (props: IContainer) => {
    return (
        <div className="root__container">{props.children}</div>
    );
};