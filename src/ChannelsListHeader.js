import React from 'react'
import './ChannelsListHeader.css'
import { FiChevronDown } from 'react-icons/fi'

function ChannelsListHeader({ title }) {
    return (
        <div className='channelsListHeader'>
            <p className='channelsListHeader_title'>{title}</p>
            <FiChevronDown />
        </div>
    )
}

export default ChannelsListHeader
