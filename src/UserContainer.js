import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserContainer.css';
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { GoUnmute, GoMute } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import { auth } from './firebase';
import Avatar from './Avatar';
import firebase from 'firebase';

function UserContainer() {
    const user = useSelector(selectUser);
    const u = firebase.auth().currentUser;
    const [loops, setLoops] = useState(true);
    const [mute, muteChange] = useState(true);
    const [deafen, deafenChange] = useState(true);
    let history = useHistory();
    let nick = ' '
    if (user) nick = user.email.slice(0, user.email.indexOf('@'));

    const logout = () => {
        if (user) {
            auth.signOut();
            history.push("/");
        }
    }

    return (
        <div className='userContainer'>
            <div className='userContainer_left' onClick={() => console.log(u)}>
                <Avatar avatarColor={u.photoURL} />
                <div>
                    <p style={{ color: 'white', fontWeight: '600' }}>{nick}</p>
                    <p>#5990</p>
                </div>
            </div>
            <div className='userContainer_right' onClick={() => console.log(user)}>
                {
                    mute
                        ?
                        <button className='userContainer_right_mute' onClick={() => muteChange(!mute)}>
                            <IoMdMic />
                        </button>
                        :
                        <button className='userContainer_right_unmute' onClick={() => muteChange(!mute)}>
                            <IoMdMicOff />
                        </button>
                }
                <div className='userContainer_right_muteAlert'>
                    <p>Mute</p>
                </div>
                <div className='userContainer_right_unmuteAlert'>
                    <p>Unmute</p>
                </div>
                {
                    deafen
                        ?
                        <button className='userContainer_right_deafen' onClick={() => deafenChange(!deafen)}>
                            <GoUnmute />
                        </button>
                        :
                        <button className='userContainer_right_undeafen' onClick={() => deafenChange(!deafen)}>
                            <GoMute />
                        </button>
                }
                <div className='userContainer_right_deafenAlert'>
                    <p>Deafen</p>
                </div>
                <div className='userContainer_right_undeafenAlert'>
                    <p>Undeafen</p>
                </div>
                <button onClick={logout} className='userContainer_right_settings'>
                    <FiLogOut />
                </button>
                <div className='userContainer_right_settingsAlert'>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default UserContainer
