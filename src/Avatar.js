import React from 'react';
import './Avatar.css';
import avatar from './images/avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import firebase from 'firebase';

function Avatar({ avatarColor }) {
    const u = firebase.auth().currentUser;

    return (
        <div className='avatar' style={{ backgroundColor: avatarColor }}>
            <img src={avatar} alt='avatar' />
        </div>
    )
}

export default Avatar
