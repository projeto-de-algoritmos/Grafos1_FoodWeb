import React from 'react';
import { Outlet } from 'react-router-dom';

export default function publicOutlet(props) {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}