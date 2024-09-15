import React, { useEffect } from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import './ChatBotHome.css'
import { useNavigate } from 'react-router-dom';

const ChatBotHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/FruitChat')
        }, 2000);
        return () => { clearTimeout(timer) }
    }, []) 
    
    return (
        <div className="app-container">
            <div className="icon-text-container">
                <div className="chat-icon">
                    <IoMdChatbubbles size={40} style={{ color: '#9c67f2' }} />
                </div>
                <div className="content">
                    <h1 className="heading">Hello</h1>
                    <h1 className="chat-highlight">Chat.</h1>
                    <p className="description">The last chat app you'll ever need.</p>
                </div>
            </div>
        </div>
    )
}

export default ChatBotHome;