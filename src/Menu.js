import React from 'react'
import Icon from './Icon'
import './Menu.css'

function Menu() {
    return (
        <div className='menu'>
            <Icon/>
            <div className='separator'/>
            {/* <Icon image='https://img.icons8.com/ios/344/discord-logo.png'/> */}
            <Icon/>
            <Icon/>
            <Icon/>
            <div className='separator'/>
            <Icon/>
        </div>
    )
}

export default Menu
