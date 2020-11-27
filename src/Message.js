import React from 'react'
import './Message.css';
import Avatar from './Avatar'
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';

function Message({ id, message, nick, date }) {
    const user = useSelector(selectUser);
    // let nick = 'nick'
    // if (user) nick = user.email.slice(0, user.email.indexOf('@'));
    let avatarColor = 'rgba(0, 0, 0, 0)';
    if (user) avatarColor = user.avatarColor;




    return (
        <div className='message'>
            <Avatar />
            <div className='message_info'>
                <div className='message_info_title'>
                    <p className='message_info_title_nick' style={{ color: avatarColor }}>{nick}</p>
                    <p className='message_info_title_date'>{date}</p>
                </div>
                <div className='message_info_text'>
                    <p>{message}</p>
                </div>
            </div>

        </div>
    )
}

export default Message
