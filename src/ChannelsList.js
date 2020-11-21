import React from 'react'
import './ChannelsList.css'
import { FiChevronDown } from 'react-icons/fi'

function Channels() {
    return (
        <div className='channelsList'>
            <div className='channelsList_header'>
                <p className='channelsList_header_title'>{'title'}</p>
                <FiChevronDown />
            </div>
        </div>
    )
}

export default Channels
