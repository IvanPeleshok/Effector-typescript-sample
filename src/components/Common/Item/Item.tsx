import React from 'react';
import './Item.scss';

interface IItem { 
    text: string;
}

export const Item = (props: IItem) => {
    return (
        <div className='item'>{props.text}</div>
    )
}