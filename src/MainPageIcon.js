import React from 'react'
import './MainPageIcon.css'


function MainPageIcon({ image }) {
    return (
        <div className='mainPageIcon'>
            <img
                src={image}
                alt='icon'
                className='mainPageIcon_img'
            />
        </div>
    )
}

export default MainPageIcon
