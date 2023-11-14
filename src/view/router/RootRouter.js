import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Service from "./service/Service";

function RootRouter(props) {
    return (
        <Routes>
            <Route path="/*" element={<Layout/>}>
                <Route index element={<Service/>}/>
            </Route>
        </Routes>
    );
}

export default RootRouter;