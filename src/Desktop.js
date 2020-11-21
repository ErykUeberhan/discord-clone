import React, { Component } from 'react'
import DesktopMenu from './DesktopMenu'
import './Desktop.css'
import FriendRequest from './FriendRequest'

export default class Desktop extends Component {
    render() {
        return (
            <div className='desktop'>
                <DesktopMenu />
                <FriendRequest />
            </div>
        )
    }
}
