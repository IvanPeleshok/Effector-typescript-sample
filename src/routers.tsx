import React from 'react';
import { Redirect } from "react-router";
import { Home } from "./components/Home/Home";
import { CounterContainer } from "./components/Counter/CounterContainer";
import { ForwardContainer } from './components/Forward/ForwardContainer';
import { ListContainer } from './components/List/ListContainer';


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
        render: () => <ListContainer />,
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