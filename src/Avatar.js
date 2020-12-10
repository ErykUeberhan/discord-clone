import React from 'react';
import './Avatar.css';
import avatar from './images/avatar.png';

function Avatar({ avatarColor }) {

    return (
        <div className='avatar' style={{ backgroundColor: avatarColor }}>
            <img src={avatar} alt='avatar' />
        </div>
    )
}

export default Avatar
