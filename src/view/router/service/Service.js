import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./style/Service.scss";
import ReactLoading from 'react-loading'

function Service(props) {

    const [chatLength, setChatLength] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [textValue, setTextValue] = useState("");
    const [chatList, setChatList] = useState([]);
    const chatRef = useRef();


    const handleButtonClick = async () => {
        await axios
            .post("http://127.0.0.1:5000/summary", {text: textValue})
            .then((response) => {
                setResponseData((prevResponseData) => [
                    ...prevResponseData,
                    response.data
                ])
                console.log(response)
                return;

                // setChatLength(prev => prev + 1);
                // chatList.push(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false))
    };

    const onTypeEnter = (e) => {
        e.preventDefault();
        if (e.keyCode === 13 && textValue !== '') {
            //chatList에 추가, 오른쪽에 표시(내 채팅)
            setIsLoading(true)
            handleButtonClick();
            //등록 후 초기화
        }
    };

    useEffect(() => {
        if(chatRef.current){
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    },[chatLength])


    return (
        <div id={"Service"}>
            {
                isLoading &&
                <div className={'loading-wrapper'}>
                    <div className={'loading'}>
                        <ReactLoading type={'bubbles'} color={'#8968ef'}/>
                    </div>
                </div>
            }

            <div className="chat-input-wrapper">
                <input
                    type="text"
                    className="chat-input"
                    placeholder={'Sweet Chat에게 채팅을 전송해 보세요'}
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    onKeyUp={(e) => onTypeEnter(e)}
                />
                <div className="enter-btn">Enter</div>
            </div>
        </div>
    );
}

export default Service;
