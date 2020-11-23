import React, { useState } from 'react'
import './UserContainer.css'
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { GoUnmute, GoMute } from "react-icons/go";
import { RiSettings5Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';

function UserContainer() {
    const user = useSelector(selectUser);
    const [mute, muteChange] = useState(true)
    const [deafen, deafenChange] = useState(true)
    return (
        <div className='userContainer'>
            <div className='userContainer_left'>
                <img
                    src='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3'
                    alt='avatar'
                />
                <div>
                    <p style={{ color: 'white', fontWeight: '600' }}>{user.email}</p>
                    <p>#5990</p>
                </div>
            </div>
            <div className='userContainer_right'>
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
                <button className='userContainer_right_settings'>
                    <RiSettings5Fill />
                </button>
                <div className='userContainer_right_settingsAlert'>
                    <p>Settings</p>
                </div>
            </div>
        </div>
    )
}

export default UserContainer
