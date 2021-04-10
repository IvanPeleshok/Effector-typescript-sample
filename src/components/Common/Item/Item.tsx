import React from 'react';
import './Item.scss';

interface IItem { 
    message: string;
}

export const Item = (props: IItem) => {
    return (
        <div className='item'>{props.message}</div>
    )
}