import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import './Menu.css'

function Menu() {
    return (
        <div className='menu'>

            <Link to='/' className='link'>
                <Icon />
            </Link>

            <div className='separator' />


            <Link to='/channel' className='link'>
                <Icon />
            </Link>

            <Icon />
            <Icon />
            <div className='separator' />
            <Icon />
        </div>
    )
}

export default Menu
