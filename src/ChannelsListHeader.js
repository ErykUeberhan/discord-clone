import React from 'react'
import './ChannelsListHeader.css'
import { FiChevronDown } from 'react-icons/fi'
import { BiMessageAltAdd } from "react-icons/bi";
import { BsX, BsPlus } from "react-icons/bs";
import db from './firebase';
import firebase from 'firebase';

function ChannelsListHeader({ title }) {

    const addCategory = () => {
        const categoryName = prompt('New category name: ');
        if (categoryName) {
            db.collection('categories').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                categoryName,
            })
        }
    }

    return (
        <div className='channelsListHeader'>
            <p className='channelsListHeader_title'>{title}</p>
            <BsPlus className='channelsListHeader_title_add' onClick={addCategory} />
        </div>
    )
}

export default ChannelsListHeader
