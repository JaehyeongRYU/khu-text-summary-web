import React, {useState} from 'react';
import './style/Header.scss';
import {useNavigate} from "react-router-dom";

function Header(props) {

    //Header에 위치한 '회의록' 클릭 시 해당 탭으로 이동하는 함수
    const clickText = () => {
        props.setSelectedTab('summary')
    }

    //Header에 위치한 '뉴스' 클릭 시 해당 탭으로 이동하는 함수
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