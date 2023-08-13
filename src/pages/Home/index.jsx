import React, { useState, useEffect, useRef } from "react"
import "./style.css"
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons'
import API from "../../networks/API";
import socketIOClient from "socket.io-client";
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Import các ngôn ngữ khác nếu cần
import 'prismjs/themes/prism-tomorrow.css';
const host = "http://localhost:3002";

const { TextArea } = Input;
const Home = () => {
    const [query, setQuery] = useState("code cho tao đoạn code js lấy thời gian");
    const [message, setMessage] = useState("");
    const socketRef = useRef();
    console.log("rerender");
    useEffect(() => {
        socketRef.current = socketIOClient.connect(host)
        socketRef.current.on("message", (res) => {
            try {
                const data = JSON.parse(res.messages);
                const unique_id = data.payload.unique_id;
                const author = data.payload.data.messageAdded.author;
                const text = data.payload.data.messageAdded.text;
                setMessage({
                    id: unique_id,
                    author: author,
                    text: text
                })
            } catch (error) {

            }
        })
    }, []);




    const handleSendMessage = async () => {
        if (query.trim() !== "") {
            const res = await API.sendMessage(query);
            if (res.data.success) {
                setQuery("");
            }
        }

    }

    return (
        <div className="container">
            <div className="header">header</div>
            <div className="side-bar">
                side-bar
            </div>
            <div className="main">
                <div className="div-chat">
                    <div className="box-chat">
                        <HMessage data={message} />
                    </div>
                    <div className="message-input">
                        <TextArea
                            className="input-text"

                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoSize={{ minRows: 1, maxRows: 5 }}
                        />
                        <SendOutlined className="btn-send-message" onClick={handleSendMessage} />
                    </div>
                </div>

            </div>
        </div>
    )
}

const HMessage = ({ data }) => {
    const { author, text } = data;


    if (text?.indexOf("```\n") >= 0) {
        Prism.highlightAll();
    }
    return (
        <div className="box-message">
            <div className="author">
                <img width={"20px"} src="cqd.ico" alt="" />
                <span>{author}</span>
            </div>
            <div className="content">
                <ReactMarkdown  >{text}</ReactMarkdown>
            </div>
        </div>
    )
}



export default Home;