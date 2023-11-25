import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./style/Service.scss";
import ReactLoading from 'react-loading'
import rightArrow from "../../asset/images/rightArrow.png";

function Service(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [summarizedText, setSummarizedText] = useState('');
    const [newsData, setNewsData] = useState([]);

    const dataParsing = (textValue) => {
        const sentences = textValue.split(/[.!?]/);
        console.log(sentences)
        // 각 문장의 중요도를 가중치로 나타내는 예시 로직
        const sentenceWeights = sentences.map(sentence => {
            // 여기에서 문장의 중요도를 판단하는 로직을 추가할 수 있습니다.
            // 예를 들어 특정 키워드의 등장 여부, 문장의 길이 등을 고려할 수 있습니다.
            return sentence.length;
        });
        console.log(sentenceWeights)
        // 중요도에 따라 정렬된 문장 배열
        const sortedSentences = sentences
            .map((sentence, index) => ({ sentence, weight: sentenceWeights[index] }))
            .sort((a, b) => b.weight - a.weight)
            .map(item => item.sentence);

        // 상위 몇 개의 문장 선택 (예: 상위 2개)
        const summarySentences = sortedSentences.slice(0, 2);
        console.log(summarySentences)
        // 선택된 문장을 조합하여 요약 생성
        const summary = summarySentences.join(' ');
        console.log(summary)
    }

    const handleButtonClick = async () => {
        if(textValue === ''){
            return;
        }

        // dataParsing(textValue)
        // return;

        setIsLoading(true)
        await axios
            .post("http://127.0.0.1:5000/summary", {text: textValue})
            .then((response) => {
                setSummarizedText(response?.data?.result);
                return;
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false))
    };

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

    useEffect( ()=> {
        loadNews();
    },[])

    console.log(newsData)

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
                                        <div className='news-box'>
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
