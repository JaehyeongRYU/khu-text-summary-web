import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Service from "./service/Service";

function RootRouter(props) {
    const [selectedTab, setSelectedTab] = useState('summary');

    return (
        <Routes>
            <Route path="/*" element={<Layout setSelectedTab={setSelectedTab}/>}>
                <Route index element={<Service selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>}/>
            </Route>
        </Routes>
    );
}

export default RootRouter;