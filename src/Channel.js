import React from 'react';
import './Channel.css';
import { FaHashtag } from "react-icons/fa";
import { BsX } from "react-icons/bs";


function Channel({ id, title }) {
    return (
        <div className='channel'>
            <div className='channel_title'>
                <FaHashtag />
                <p className='channel_title_text'>{title}</p>
            </div>
            <BsX className='channel_remove' />
        </div>
    )
}

export default Channel
