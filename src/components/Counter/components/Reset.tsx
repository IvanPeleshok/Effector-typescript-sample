import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

interface IReset {
    onClick: () => void;
}

export const CounterReset = (props: IReset) => {
    return (
        <ListItemIcon style={{minWidth: '0'}} onClick={props.onClick}>
            <RotateLeftIcon />
        </ListItemIcon>
    )
}