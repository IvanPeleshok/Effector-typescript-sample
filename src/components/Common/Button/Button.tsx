import React from 'react';
import './Button.scss';
import Btn from '@material-ui/core/Button';


interface IRootButton {
    label?: string;
    onClick: () => void;
};

export const Button = (props: IRootButton) => {
    return (
        <Btn className="button" variant="contained" color="primary" onClick={props.onClick}>
            {props.label}
        </Btn>
    );
};