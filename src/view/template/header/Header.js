import React, {useState} from 'react';
import './style/Header.scss';
import {useNavigate} from "react-router-dom";

function Header(props) {

    const clickText = () => {
        props.setSelectedTab('summary')
    }

    const clickNews = () => {
        props.setSelectedTab('news')
    }

    return (
        <div id={"Header"}>
            <div className="header-container">
                <div className="left-wrapper">
                    <div className="logo-wrapper">
                        Text Summarization
                    </div>

                </div>
                <div className="btn-wrapper">
                    <div className="text-wrapper" onClick={()=>clickText()}>
                        회의록
                    </div>
                    <div className="text-wrapper" onClick={()=>clickNews()}>
                        뉴스
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;