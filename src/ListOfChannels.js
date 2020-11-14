import React, { Component } from 'react'
import './ListOfChannels.css'
import { FaUserFriends } from 'react-icons/fa';
import { GiSpikedSnail } from 'react-icons/gi';
import FriendButton from './FriendButton';
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { GoUnmute, GoMute } from "react-icons/go";
import { RiSettings5Fill } from "react-icons/ri";

export default class StateProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { toggleMic: true, toggleHp: true }
        this.mute = this.mute.bind(this);
        this.deafen = this.deafen.bind(this);
    }


    mute() {
        this.setState(state => ({
            toggleMic: !state.toggleMic
        }));
    }

    deafen() {
        this.setState(state => ({
            toggleHp: !state.toggleHp
        }));
    }
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
                <div className='listOfChannels_directMessages_userContainer'>
                    <div className='listOfChannels_directMessages_userContainer_left'>
                        <img
                            src='https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3'
                            alt='avatar'
                        />
                        <div>
                            <p style={{ color: 'white', fontWeight: '600' }}>Bagi</p>
                            <p>#5990</p>
                        </div>
                    </div>
                    <div className='listOfChannels_directMessages_userContainer_right'>
                        {
                            this.state.toggleMic === true
                                ?
                                <button onClick={this.mute}>
                                    <IoMdMic />
                                </button>
                                :
                                <button onClick={this.mute}>
                                    <IoMdMicOff />
                                </button>
                        }
                        {
                            this.state.toggleHp === true
                                ?
                                <button onClick={this.deafen}>
                                    <GoUnmute />
                                </button>
                                :
                                <button onClick={this.deafen}>
                                    <GoMute />
                                </button>
                        }
                        <button>
                            <RiSettings5Fill />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
