import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ServerIcon from './ServerIcon'
import MainPageIcon from './MainPageIcon'
import './Menu.css'
import avatar from './images/avatar.png';
import DownloadIcon from './DownloadIcon'
import ExploreIcon from './ExploreIcon'
import AddServerIcon from './AddServerIcon'
import db from './firebase';
import { useSelector } from 'react-redux';
import { selectServerId, selectServerName } from './features/counter/appSlice';
import firebase from 'firebase';

function Menu() {
    const serverName = useSelector(selectServerName);
    const serverId = useSelector(selectServerId);
    const [servers, setServers] = useState([]);


    useEffect(() => {

        db.collection('servers').orderBy('timestamp').onSnapshot((snapshot) =>
            setServers(snapshot.docs.map((doc) => ({
                id: doc.id,
                server: doc.data(),
            })))
        );

    }, [])
    return (
        <div className='menu'>
            <Link to='/' className='link'>
                <MainPageIcon image={avatar} />
            </Link>

            <div className='separator' />

            {servers.map(({ id, server }) => (
                <Link to='/channel' className='link'>
                    <ServerIcon key={id} id={id} title={server.serverName} />
                </Link>
            ))}

            <AddServerIcon />
            <ExploreIcon />
            <div className='separator' />
            <DownloadIcon />
        </div>
    )
}

export default Menu
