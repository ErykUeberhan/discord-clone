import React from 'react'
import './AddServerIcon.css'
import { HiOutlinePlus } from 'react-icons/hi';
import db from './firebase';
import { useSelector } from 'react-redux';
import { selectServerId, selectServerName } from './features/counter/appSlice';
import firebase from 'firebase';

function AddServerIcon() {
    const serverId = useSelector(selectServerId);

    const addServer = () => {
        const serverName = prompt('Enter server name: ');
        if (serverName) {
            db.collection('servers').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                serverName: serverName,
            });
        }
    }
    return (
        <div className='addServerIcon' onClick={addServer}>
            <HiOutlinePlus className='addServerIcon_icon' />
        </div>
    )
}

export default AddServerIcon
