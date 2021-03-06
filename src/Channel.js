import React from 'react';
import './Channel.css';
import { FaHashtag } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { setChannelInfo, selectCategoryId, selectChannelId, selectServerId } from './features/counter/appSlice';
import db from './firebase';


function Channel({ id, title }) {
    const dispatch = useDispatch();
    const categoryId = useSelector(selectCategoryId);
    const channelId = useSelector(selectChannelId);
    const serverId = useSelector(selectServerId);

    // remove channel from database
    const removeChannel = () => {
        const channel = db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').doc(channelId);

        // remove data belonging to this channel
        channel.collection('messages').get().then((rel) => {
            rel.forEach((element) => {
                element.ref.delete();
            })
        })

        // delete channel
        channel.delete();

        // set local info about removed data to null
        dispatch(
            setChannelInfo({
                channelId: null,
            })
        )

    }
    return (
        <div className='channel' onClick={() => {
            // send info about choosen channel
            if (id !== channelId) {
                dispatch(
                    setChannelInfo({
                        channelId: id,
                        channelName: title,
                    })
                )
            }
        }}>
            <div className='channel_title'>
                <FaHashtag />
                <p className='channel_title_text'>{title}</p>
            </div>
            {
                id === channelId
                    ?
                    <BsX className='channel_remove' onClick={removeChannel} />
                    :
                    null
            }

        </div>
    )
}

export default Channel
