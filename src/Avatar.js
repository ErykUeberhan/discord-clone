import React from 'react';
import './Avatar.css';
import avatar from './images/avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';

function Avatar() {
    const user = useSelector(selectUser);
    let avatarColor = 'rgba(0, 0, 0, 0)';
    if (user) avatarColor = user.avatarColor;
    return (
        <div className='avatar' style={{ backgroundColor: avatarColor }}>
            <img src={avatar} alt='avatar' />
        </div>
    )
}

export default Avatar
