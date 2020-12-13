import React from 'react'
import './ChannelsListHeader.css'
import { BsPlus } from "react-icons/bs";
import db from './firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectServerId, selectServerName } from './features/counter/appSlice';

function ChannelsListHeader() {
    const serverId = useSelector(selectServerId);
    const serverName = useSelector(selectServerName);

    // add category to database
    const addCategory = () => {
        const categoryName = prompt('New category name: ');
        if (serverId && categoryName) {
            db.collection('servers').doc(serverId).collection('categories').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                categoryName,
            })
        }
    }

    return (
        <div className='channelsListHeader'>
            {
                serverId
                    ?
                    <>
                        <p className='channelsListHeader_title'>{serverName}</p>
                        <BsPlus className='channelsListHeader_title_add' onClick={addCategory} />
                    </>
                    :
                    null
            }

        </div>
    )
}

export default ChannelsListHeader
