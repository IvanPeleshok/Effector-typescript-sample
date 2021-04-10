import React from 'react';
import { Redirect } from "react-router";
import { CounterContainer } from "./components/Counter/CounterContainer";
import { SampleContainer } from "./components/Sample/SampleContainer";
import { Home } from "./components/Home/Home";

interface IOption {
    exact?: boolean;
}

export interface IRouter {
    name?: string;
    path: string,
    component: () => React.ReactNode;
    option?: IOption;
}

export const routers: IRouter[] = [
    {   
        name: 'Main',
        path: '/',
        component: () => <Home />,
        option: {
            exact: true
        }
    },
    {   
        name: 'Counter',
        path: '/counter',
        component: () => <CounterContainer />,
    },
    {
        name: 'Item',
        path: '/item',
        component: () => <SampleContainer />,
    },
    {
        path: '*',
        component: () => <Redirect to='/' />
    }
]