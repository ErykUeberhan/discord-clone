import React, { useState } from 'react'
import './ChannelsListHeader.css'
import { BsPlus } from "react-icons/bs";
import db from './firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectServerId, selectServerName } from './features/counter/appSlice';

function ChannelsListHeader() {
    const serverId = useSelector(selectServerId);
    const serverName = useSelector(selectServerName);
    const [categoryName, setCategoryName] = useState('');
    const [categoryPrompt, setCategoryPrompt] = useState(false);

    // add category to database
    const addCategory = () => {
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
                        <BsPlus className='channelsListHeader_title_add' onClick={() => setCategoryPrompt(true)} />
                    </>
                    :
                    null
            }
            {
                categoryPrompt
                    ?
                    <div className='channelsListHeader_prompt' onClick={(e) => e.stopPropagation()}>
                        <div className='channelsListHeader_prompt_field'>
                            <p className='channelsListHeader_prompt_field_title'>Create Category</p>
                            <div className='channelsListHeader_prompt_field_insert'>
                                <p className='channelsListHeader_prompt_field_insert_title'>CATEGORY NAME</p>
                                <input className='channelsListHeader_prompt_field_insert_input' onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                            <div className='channelsListHeader_prompt_field_buttons'>
                                <button className='channelsListHeader_prompt_field_buttons_cancel' onClick={() => setCategoryPrompt(false)}>Cancel</button>
                                <button className='channelsListHeader_prompt_field_buttons_submit' onClick={() => { if (categoryName.length > 0) addCategory(); setCategoryPrompt(false) }}>Create</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default ChannelsListHeader
