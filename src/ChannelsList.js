import React, { useState, useEffect } from 'react'
import './ChannelsList.css'
import UserContainer from './UserContainer'
import Category from './Category'
import ChannelsListHeader from './ChannelsListHeader'
import db from './firebase'
import { useSelector } from 'react-redux'
import { selectServerId } from './features/counter/appSlice';

function ChannelsList() {
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
        <div className='channelsList'>
            <div className='channelsList_top'>
                <ChannelsListHeader title='Channel' />
                <div className='channelsList_body'>
                    {categories.map(({ id, category }) => (
                        <Category key={id} id={id} title={category.categoryName} />
                    ))}
                </div>
            </div>
            <UserContainer />
        </div>
    )
}

export default ChannelsList
