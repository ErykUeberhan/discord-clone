import React from 'react';
import './Channel.css';
import { FaHashtag } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { setChannelInfo, selectCategoryId, selectChannelId } from './features/counter/appSlice';
import db from './firebase';


function Channel({ id, title }) {
    const dispatch = useDispatch();
    const categoryId = useSelector(selectCategoryId);
    const channelId = useSelector(selectChannelId);

    const removeChannel = () => {
        const channel = db.collection('categories').doc(categoryId).collection('channels').doc(channelId);
        channel.collection('messages').get().then((rel) => {
            rel.forEach((element) => {
                element.ref.delete();
            })
        })
        channel.delete();
    }
    return (
        <div className='channel' onClick={() => {
            dispatch(
                setChannelInfo({
                    channelId: id,
                    channelName: title,
                })
            )
        }}>
            <div className='channel_title'>
                <FaHashtag />
                <p className='channel_title_text'>{title}</p>
            </div>
            <BsX className='channel_remove' onClick={removeChannel} />
        </div>
    )
}

export default Channel
