import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./style/Service.scss";
import ReactLoading from 'react-loading'
import rightArrow from "../../asset/images/rightArrow.png";

function Service(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [summarizedText, setSummarizedText] = useState('');

    const dataParsing = (textValue) => {
        // 숫자 제거
        let numReg = /[0-9]/gim;

        // 특수문자, 괄호, 점, 모두 제거
        let specialReg= /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;

        //정규식에 해당하는 문자를 replace 로 제거
        let firstResultData = textValue.replace(numReg, "");
        let secondResultData = firstResultData.replace(specialReg, "");
        console.log(firstResultData);
        console.log(secondResultData);

    }
    const handleButtonClick = async () => {
        // dataParsing(textValue)
        // return;

        setIsLoading(true)
        await axios
            .post("http://127.0.0.1:5000/summary", {text: textValue})
            .then((response) => {
                console.log(response)
                setSummarizedText(response?.data?.result);
                return;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false))
    };

    return (
        <div id={"Service"}>

            <div className="main-content-wrapper">
                <div className="user-text-wrapper">
                    <div className="title">
                        User Input
                    </div>
                    <textarea
                        className="user-input"
                        placeholder={'요약할 글을 입력해 보세요'}
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />

                    <div className="button-wrapper">
                        <div className="summarize-button" onClick={() => handleButtonClick()}>
                            요약하기
                        </div>
                    </div>
                </div>
                <div className="arrow-wrapper">
                    <img className='right-arrow-img' alt={""} src={rightArrow}/>
                </div>
                <div className="model-text-wrapper">
                    <div className="title">
                        Model Output
                    </div>
                    {
                        isLoading ?
                            <div className={'loading-wrapper'}>
                                <div className={'loading'}>
                                    <ReactLoading type={'bubbles'} color={'#fa7116'}/>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    summarizedText !== "" ?
                                        <div className="model-text">
                                            {summarizedText}
                                        </div>
                                        :
                                        <div className="model-text">
                                            none
                                        </div>
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Service;
