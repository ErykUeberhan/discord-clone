import React from 'react'
import './AddServerIcon.css'
import { HiOutlinePlus } from 'react-icons/hi';
import db from './firebase';
import firebase from 'firebase';

function AddServerIcon() {

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
