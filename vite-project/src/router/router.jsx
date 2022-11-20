import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import { Outlet } from './publicOutlet';

export default function AppRouter(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route element={<Outlet />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}