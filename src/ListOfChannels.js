import React from 'react'
import './ListOfChannels.css'
import { FaUserFriends } from 'react-icons/fa';
import { GiSpikedSnail } from 'react-icons/gi';
import FriendButton from './FriendButton';

function ListOfChannels() {
    return (
        <div className='listOfChannels'>
            <div className='listOfChannels_searchBar'>
                <button>Find or start a conversation</button>
            </div>
            <div className='listOfChannels_directMessages'>
                <button><FaUserFriends className='listOfChannels_directMessages_icon' />Friends</button>
                <button><GiSpikedSnail className='listOfChannels_directMessages_icon' />Nitro</button>
                <p>DIRECT MESSAGES</p>
                <FriendButton image='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' nick='Bagi' />
            </div>
        </div >
    )
}

export default ListOfChannels
