import React, { useState } from 'react'
import './FriendRequest.css'

function FriendRequest() {
    const [toggle, toggleChange] = useState(false)
    let buttonAvailable = (event) => {
        if (event.target.value.length > 0) {
            toggleChange(true)
        }
        else {
            toggleChange(false)
        }
    }
    return (
        <div className='friendRequest'>
            <p className='friendRequest_title'>ADD FRIEND</p>
            <p className='friendRequest_description'>You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</p>
            <div className='friendRequest_input'>
                <input className='friendRequest_enterUser' onChange={buttonAvailable} type='text' placeholder='Enter a Username#0000' />
                {toggle
                    ?
                    <button className='friendRequest_sendRequest' style={{ opacity: '1' }}>Send Friend Request</button>
                    :
                    <button className='friendRequest_sendRequest'>Send Friend Request</button>
                }
            </div>
        </div>
    )
}

export default FriendRequest

