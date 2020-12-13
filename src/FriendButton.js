import React from 'react'
import './FriendButton.css'
import { BsX } from "react-icons/bs";



function FriendButton({ image, nick }) {
    return (
        <div className='friendButton'>
            <img src={image} alt='avatar' />
            {nick}
            <div className='friendButton_xIconDiv' onClick={removeFriend}>
                <BsX className='friendButton_xIconDiv_xIcon' />
            </div>
        </div>
    )
}

export default FriendButton
