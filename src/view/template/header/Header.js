import React, {useState} from 'react';
import './style/Header.scss';
import {useNavigate} from "react-router-dom";

function Header(props) {

    return (
        <div id={"Header"}>
            <div className="header-container">
                <div className="left-wrapper">
                    <div className="logo-wrapper">
                        Text Summarization
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;