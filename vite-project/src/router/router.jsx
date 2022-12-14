import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import InitialPage from '../pages/InitialPage/InitialPage';
import PublicOutlet from './PublicOutlet';
import GraphViewPage from '../pages/GraphViewPage/GraphViewPage';
import AddNodePage from '../pages/AddNodePage/AddNodePage';
import AddLinkPage from '../pages/AddLinkPage/AddLinkPage';
import SearchEdgePage from '../pages/SearchEdgePage/SeachEdgePage';

export default function AppRouter(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicOutlet />}>
                        <Route path="/" element={<InitialPage />} />
                        <Route path="/teia" element={<GraphViewPage />} />
                        <Route path="/add-node" element={<AddNodePage />} />
                        <Route path="/add-link" element={<AddLinkPage />} />
                        <Route path="/search-link" element={<SearchEdgePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}