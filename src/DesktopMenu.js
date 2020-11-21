import React from 'react'
import './DesktopMenu.css'

function DesktopMenu() {
    return (
        <div className='desktopMenu'>
            <button className='desktopMenu_friends'>Friends</button>
            <button className='desktopMenu_online'>Online</button>
            <button className='desktopMenu_all'>All</button>
            <button className='desktopMenu_pending'>Pending</button>
            <button className='desktopMenu_blocked'>Blocked</button>
            <button className='desktopMenu_addFriend'>Add Friend</button>
        </div>
    )
}

export default DesktopMenu
