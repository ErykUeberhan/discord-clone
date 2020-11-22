import React, { Component } from 'react'
import './Friends.css'
import { FaUserFriends } from 'react-icons/fa';
import { GiSpikedSnail } from 'react-icons/gi';
import FriendButton from './FriendButton';
import UserContainer from './UserContainer';

export default class StateProvider extends Component {
    render() {
        return (
            <div className='listOfChannels'>
                <div>
                    <div className='listOfChannels_searchBar'>
                        <button>Find or start a conversation</button>
                    </div>
                    <div className='listOfChannels_directMessages'>
                        <div className='listOfChannels_directMessages_friends'>
                            <button><FaUserFriends className='listOfChannels_directMessages_friends_icon' />Friends</button>
                            <button><GiSpikedSnail className='listOfChannels_directMessages_friends_icon' />Nitro</button>
                            <div className='listOfChannels_directMessages_friends_title'>
                                <p>DIRECT MESSAGES</p>

                                <div className='listOfChannels_directMessages_friends_title_add'>
                                    +
                                    <div className='listOfChannels_directMessages_friends_title_alert'>
                                        <p>Add new friend</p>
                                    </div>
                                </div>
                            </div>
                            <FriendButton image='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3' nick='Bagi' />
                        </div>
                    </div>
                </div>
                <UserContainer />
            </div>
        );
    }
}
