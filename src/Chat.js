import React, { useState } from 'react';
import './Chat.css';
import { MdAddCircle } from "react-icons/md";
import { FaGift, FaSmile } from "react-icons/fa";
import { RiFileGifFill } from "react-icons/ri";
import { MdSend } from "react-icons/md";
import Message from './Message';
import { useEffect } from 'react';
import db from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';

function Chat() {
    const user = useSelector(selectUser);

    const [messages, setMessages] = useState([])
    const [messageText, setMessageText] = useState()



    const sendMessage = () => {
        let nick = ''
        if (user) nick = user.email.slice(0, user.email.indexOf('@'));

        const dateEdit = (date) => {
            if (date < 10) return `0${date}`
            else return date
        }
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let date = `${dateEdit(hours)}:${dateEdit(minutes)} \xa0 ${dateEdit(day)}/${dateEdit(month)}/${dateEdit(year)}`;

        db.collection('messages').add({
            message: messageText,
            nick,
            date,
        })
    }

    useEffect(() => {
        db.collection("messages").onSnapshot((snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    msg: doc.data(),
                }))
            )
        );
    }, [])
    return (
        <div className='chat'>
            <div className='chat_messages'>
                {messages.map(({ id, msg }) => (
                    <Message key={id} id={id} message={msg.message} nick={msg.nick} date={msg.date} />
                ))}
            </div>
            <div className='chat_sendTextField'>
                <MdAddCircle className='chat_sendTextField_icon' />
                <input className='chat_sendTextField_input' onChange={(event) => setMessageText(event.target.value)} />
                <MdSend className='chat_sendTextField_send' onClick={() => { if (messageText.length > 0) sendMessage() }} />
                <FaGift className='chat_sendTextField_icon' />
                <RiFileGifFill className='chat_sendTextField_icon' />
                <FaSmile className='chat_sendTextField_icon' />
            </div>
        </div>
    )
}

export default Chat
