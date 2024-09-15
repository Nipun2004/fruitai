import React, { useEffect, useState, useRef } from 'react';
import './ChatBot1.css';
import fruitsAll from '../data';
import CardResponse from './CardResponse';
import { useNavigate } from 'react-router-dom';


const ChatBot1 = () => {
    const [prompt, setPrompt] = useState('');
    const [conversation, setConversation] = useState([]);
    const messagesEndRef = useRef(null);
    const navigate=useNavigate();
    // Scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll whenever conversation updates
    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    function handlePrompt() {
        if (prompt.toLowerCase().includes('fruits')) {
            setConversation((prev) => [...prev, { prompt, response: fruitsAll }]);
        } else {
            const filterFruit = fruitsAll.filter((fruit) =>
                fruit.name.toLowerCase().includes(prompt.toLowerCase())
            );
            setConversation((prev) => [...prev, { prompt, response: filterFruit }]);
        }
        setPrompt('');
    }

    function handleBack() {
        navigate('/Home')
    }

    return (
        <div className='main-container'>
            <div className='content'>
                <div className='messages'>
                    {conversation.map((con, index) => (
                        <div key={index}>
                            <div className='cardPrompt'>{con.prompt}</div>
                            <div>
                                {con.response.length === 0 ? (
                                    <div className='cardResponse'>
                                        <p>Fruit not found</p>
                                    </div>
                                ) : (
                                    con.response.map((res, resIndex) => (
                                        <div className='cardResponse' key={resIndex}>
                                            <CardResponse res={res} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                    {/* This div ensures we scroll to the bottom */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className='input-prompt'>
                <div className='chat'>
                    <input
                        type='text'
                        id='chat-box'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Search all fruits or by name of fruits'
                    />
                    <button className='btn' onClick={handlePrompt}>Send</button>
                    <button className='btn' onClick={handleBack}>Back To Home</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot1;
