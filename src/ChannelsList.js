import React from 'react'
import './ChannelsList.css'
import UserContainer from './UserContainer'
import Category from './Category'
import ChannelsListHeader from './ChannelsListHeader'

function Channels() {
    return (
        <div className='channelsList'>
            <div className='channelsList_top'>
                <ChannelsListHeader title='Channel' />
                <div className='channelsList_body'>
                    <Category title='TEXT CHANNELS' />
                </div>
            </div>
            <UserContainer />
        </div>
    )
}

export default Channels
