import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Outlet(props) {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}