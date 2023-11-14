import React, {useState} from 'react';
import './style/Header.scss';
import {useNavigate} from "react-router-dom";

function Header(props) {
    let navigate = useNavigate();

    const onClickStart = () => {
        navigate('/service');
    }

    const handleClickScroll = (idText) => {
        const element = document.getElementById(idText);
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }


    return (
        <div id={"Header"}>
            <div className="header-container">
                <div className="left-wrapper">
                    <div className="logo-wrapper">
                        Text Summarization
                    </div>
                    <div className="tab-wrapper">
                    </div>
                </div>
                <div className="btn-wrapper" onClick={() => onClickStart()}>
                    <div className="start-btn">Start</div>
                </div>
            </div>
        </div>
    );
}

export default Header;