import React from 'react'
import './Message.css';
import Avatar from './Avatar'

function Message({ id, message, nick, date, avatarColor }) {

    return (
        <div className='message'>
            <Avatar avatarColor={avatarColor} />
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
