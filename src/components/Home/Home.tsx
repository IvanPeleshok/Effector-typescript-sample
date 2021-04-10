import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
        fontSize: "5rem",
        maring: '50px auto',
        width: '100%',
        textAlign: 'center'
    }
}));

export const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.label}>
            Effector meetup
        </div>
    )
}