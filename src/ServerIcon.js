import React from 'react'
import { useDispatch } from 'react-redux'
import { setServerInfo } from './features/counter/appSlice';
import './ServerIcon.css'


function ServerIcon({ id, title }) {
    const dispatch = useDispatch();
    return (
        <div className='serverIcon' onClick={() => {
            dispatch(
                setServerInfo({
                    serverId: id,
                    serverName: title,
                })
            )
        }}>
            <p className='serverIcon_title'>{title ? title[0] : null}</p>
        </div>
    )
}

export default ServerIcon
