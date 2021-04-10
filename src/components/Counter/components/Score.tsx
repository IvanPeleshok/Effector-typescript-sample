import React from 'react';
import './Score.scss';

interface IRootScore {
    score: number;
}

export const CounterScore = (props: IRootScore) => {
    return (
        <div className="root__score">{props.score}</div>
    )
}