import React, { useState, useEffect } from 'react'
import './ChannelsList.css'
import UserContainer from './UserContainer'
import Category from './Category'
import ChannelsListHeader from './ChannelsListHeader'
import db from './firebase'

function ChannelsList() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        db.collection('categories').orderBy('timestamp').onSnapshot((snapshot) => {
            setCategories(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    category: doc.data(),
                }))
            )
        })
    }, [])

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
