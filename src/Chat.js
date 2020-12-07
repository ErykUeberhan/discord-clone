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
import { selectCategoryId, selectChannelId, selectChannelName, selectServerId } from './features/counter/appSlice';
import firebase from 'firebase';
import { FaHashtag } from "react-icons/fa";

function Chat() {
    const user = useSelector(selectUser);
    const u = firebase.auth().currentUser;
    const categoryId = useSelector(selectCategoryId);
    const serverId = useSelector(selectServerId);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState();
    const [messagesEnd, setMessagesEnd] = useState();
    const [serverName, setServerName] = useState('server');


    const sendMessage = () => {
        console.log(channelId)
        if (channelId) {
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

            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').doc(channelId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: messageText,
                nick,
                date,
                avatarColor: u.photoURL,
            })
        }
    }

    useEffect(() => {
        if (channelId) {
            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').doc(channelId).collection("messages").orderBy('timestamp').onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        msg: doc.data(),
                    }))
                )
            );
        }
    }, [channelId])
    return (
        <div className='chat'>
            <div className='chat_messages'>
                <div className='chat_messages_top'>

                </div>
                <div className='chat_messages_bottom' >
                    <div className='chat_messages_bottom_emptyChannel'>
                        <div className='chat_messages_bottom_emptyChannel_icon'><FaHashtag /></div>
                        <p className='chat_messages_bottom_emptyChannel_welcome'>Welcome to #{channelName ? channelName : serverName}!</p>
                        {
                            channelName
                                ?
                                <p className='chat_messages_bottom_emptyChannel_description'>This is the start of the #{channelName ? channelName : serverName} channel.</p>
                                :
                                <p className='chat_messages_bottom_emptyChannel_description'>Choose category and channel.</p>
                        }
                    </div>
                    {messages.map(({ id, msg }) => (
                        <Message key={id} id={id} message={msg.message} nick={msg.nick} date={msg.date} avatarColor={msg.avatarColor} />
                    ))}
                    {(messagesEnd)
                        ?
                        messagesEnd.scrollIntoView({ behavior: 'smooth' })
                        :
                        null
                    }



                    <div ref={(el) => setMessagesEnd(el)}>
                    </div>
                </div>
            </div>
            <div className='chat_sendTextField'>
                <MdAddCircle className='chat_sendTextField_icon' />
                {
                    channelName
                        ?
                        <input className='chat_sendTextField_input' onChange={(event) => setMessageText(event.target.value)} placeholder={`Message #${channelName}`} />
                        :
                        <input className='chat_sendTextField_input' onChange={(event) => setMessageText(event.target.value)} placeholder={`Message #${serverName}`} readOnly='readonly' />
                }
                <MdSend className='chat_sendTextField_send' onClick={() => { if (channelName && messageText.length > 0) sendMessage() }} />
                <FaGift className='chat_sendTextField_icon' />
                <RiFileGifFill className='chat_sendTextField_icon' />
                <FaSmile className='chat_sendTextField_icon' onClick={() => console.log(u.photoURL)} />
            </div>
        </div>
    )
}

export default Chat
