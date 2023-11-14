import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../template/header/Header";

function Layout(props) {

    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 auto',
    }

    return (
        <>
            <Header/>
            <main style={layoutStyle}>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;