import React, { useState, useEffect } from 'react'
import './MobileChannelsList.css'
import UserContainer from './UserContainer'
import Category from './Category'
import ChannelsListHeader from './ChannelsListHeader'
import db from './firebase'
import { useSelector } from 'react-redux'
import { selectServerId } from './features/counter/appSlice';

function MobileChannelsList() {
    const serverId = useSelector(selectServerId);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (serverId) {
            db.collection('servers').doc(serverId).collection('categories').orderBy('timestamp').onSnapshot((snapshot) => {
                setCategories(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        category: doc.data(),
                    }))
                )
            })
        }
    }, [serverId])

    return (
        <div className='mobileChannelsList'>
            <div className='mobileChannelsList_top'>
                <ChannelsListHeader title='Channel' />
                <div className='mobileChannelsList_body'>
                    {categories.map(({ id, category }) => (
                        <Category key={id} id={id} title={category.categoryName} />
                    ))}
                </div>
            </div>
            <UserContainer />
        </div>
    )
}

export default MobileChannelsList
