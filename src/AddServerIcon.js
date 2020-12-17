import React, { useState } from 'react'
import './AddServerIcon.css'
import { HiOutlinePlus } from 'react-icons/hi';
import db from './firebase';
import firebase from 'firebase';

function AddServerIcon() {
    const [serverName, setServerName] = useState('');
    const [serverPrompt, setServerPrompt] = useState(false);

    // add server to database
    const addServer = () => {
        if (serverName) {
            db.collection('servers').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                serverName,
            });
        }
    }
    return (
        <div className='addServerIcon' onClick={() => setServerPrompt(true)}>
            <HiOutlinePlus className='addServerIcon_icon' />
            <div className='addServerIcon_alert'>
                <p>Add server</p>
            </div>
            {
                serverPrompt
                    ?
                    <div className='addServerIcon_prompt' onClick={(e) => e.stopPropagation()}>
                        <div className='addServerIcon_prompt_field'>
                            <p className='addServerIcon_prompt_field_title'>Create Server</p>
                            <div className='addServerIcon_prompt_field_insert'>
                                <p className='addServerIcon_prompt_field_insert_title'>SERVER NAME</p>
                                <input className='addServerIcon_prompt_field_insert_input' onChange={(e) => setServerName(e.target.value)} />
                            </div>
                            <div className='addServerIcon_prompt_field_buttons'>
                                <button className='addServerIcon_prompt_field_buttons_cancel' onClick={() => setServerPrompt(false)}>Cancel</button>
                                <button className='addServerIcon_prompt_field_buttons_submit' onClick={() => { if (serverName.length > 0) addServer(); setServerPrompt(false) }}>Create</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default AddServerIcon
