import React from 'react';
import { Redirect } from "react-router";
import { CounterContainer } from "./components/Counter/CounterContainer";
import { SampleContainer } from "./components/Sample/SampleContainer";
import { Home } from "./components/Home/Home";
import { ForwardContainer } from './components/Forward/ForwardContainer';


export interface IRouter {
    name?: string;
    path: string,
    render: () => React.ReactNode;
    exact?: boolean;
}

export const routers: IRouter[] = [
    {   
        name: 'Main',
        path: '/',
        render: () => <Home />,
        exact: true
    },
    {   
        name: 'Counter',
        path: '/counter',
        render: () => <CounterContainer />,
    },
    {
        name: 'List',
        path: '/list',
        render: () => <SampleContainer />,
    },
    {
        name: 'Forward',
        path: '/forward',
        render: () => <ForwardContainer />,
    },
    {
        path: '*',
        render: () => <Redirect to='/' />
    }
]