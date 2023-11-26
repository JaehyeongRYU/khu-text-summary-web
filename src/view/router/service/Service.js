import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./style/Service.scss";
import ReactLoading from 'react-loading'
import rightArrow from "../../asset/images/rightArrow.png";

function Service(props) {

    //모델의 출력값을 받아올때까지 loading을 위한 state
    const [isLoading, setIsLoading] = useState(false);

    //User의 입력값을 위한 state
    const [textValue, setTextValue] = useState("");

    //User의 입력 Type을 위한 state
    const [textType, setTextType] = useState('summary');

    //모델의 출력값을 위한 state
    const [summarizedText, setSummarizedText] = useState('');

    //Naver News 데이터를 위한 state
    const [newsData, setNewsData] = useState([]);

    //News 데이터를 모델의 입력 전 정규식으로 특수문자, 괄호, 점 제거하기 위한 함수
    const dataParsing = (textValue) => {

        // 특수문자, 괄호, 점, 모두 제거
        let specialReg= /[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gim;

        //정규식에 해당하는 문자를 replace 로 제거
        let parsedTextValue = textValue.replace(specialReg, "");

        return parsedTextValue;
    }

    //회의록 데이터를 모델의 입력 전 parsing 하기 위한 함수
    const sentenceParsing = (textValue) => {
        //입력된 회의록을 한 줄 단위로 나눈다.
        const sentences = textValue.split(/[.!?]/);

        console.log(sentences)

        // 참석자, 회의 날짜와 같은 요약에 의미없는 데이터를 삭제한다.
        const summarySentences = sentences.slice(1, sentences.length);
        // 수정된 데이터를 다시 문단 형식으로 바꿔준다.
        console.log(summarySentences)


        const summary = summarySentences.map(item => item + '.').join(' ');
        console.log(summary.replace(/\n/g, ""))

        // 공백을 제거하여 return 한다.
        return summary.replace(/\n/g, "")
    }

    //'요약하기' 버튼 클릭시 실행 함수
    const handleButtonClick = async () => {
        if(textValue === ''){
            return;
        }

        if (textValue.indexOf('회의') !== -1) {
            console.log('회의록!')
            //회의록 요약
            setIsLoading(true)
            await axios
                .post("http://127.0.0.1:5000/summary", {text: (sentenceParsing(textValue))})
                .then((response) => {
                    setSummarizedText(response?.data?.result);
                    return;
                })
                .catch((error) => {
                    if(error){

                    }
                    console.error(error);
                })
                .finally(() => setIsLoading(false))
        } else {
            console.log('뉴스!')
            //그 외 요약
            setIsLoading(true)
            await axios
                .post("http://127.0.0.1:5000/summary", {text: dataParsing(textValue)})
                .then((response) => {
                    setSummarizedText(response?.data?.result);
                    return;
                })
                .catch((error) => {
                    if(error){

                    }
                    console.error(error);
                })
                .finally(() => setIsLoading(false))
        }
    };

    //서버를 통해 Naver news 중앙일보 상위 5개를 get 해오는 함수
    const loadNews = async () => {
        await axios
            .get("http://127.0.0.1:5000/news")
            .then((response) => {
                setNewsData(response.data);
                return;
            })
            .catch((error) => {
                console.error(error);
            })
    }

    //News를 불러오기 위한 useEffect
    useEffect( ()=> {
        loadNews();
    },[])

    //News 제목 클릭 시 Naver 해당 링크로 이동하기 위한 함수
    const clickNewsTitle = (newsContent) => {
        props.setSelectedTab('summary')
        setTextValue(newsContent);
        setSummarizedText('');
    }

    return (
        <div id={"Service"}>
            {
                props.selectedTab === 'summary' ?
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
                                                null
                                        }
                                    </>
                            }
                        </div>
                    </div>
                    :
                    <div className="main-content-wrapper">
                        <div className="news-wrapper">
                            {
                                newsData.map((li,index)=>{
                                    return(
                                        <div className='news-box' key={index}>
                                            <div className="news-title-wrapper" onClick={()=>clickNewsTitle(li?.news_content)}>
                                                {li?.news_title}
                                            </div>
                                            <div className="news-link-wrapper" onClick={()=>window.open(li?.news_link)}>
                                                {li?.news_link}
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

            }
        </div>
    );
}

export default Service;
