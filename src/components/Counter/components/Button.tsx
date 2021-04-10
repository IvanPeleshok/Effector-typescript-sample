import React from 'react';
import './Button.scss';
import Button from '@material-ui/core/Button';


interface IRootButton {
    label?: string;
    onClick: () => void;
};

export const CounterButton = (props: IRootButton) => {
    return (
        <Button className="counter__button" variant="contained" color="primary" onClick={props.onClick}>
            {props.label}
        </Button>
    );
};