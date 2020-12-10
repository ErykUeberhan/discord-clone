import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ServerIcon from './ServerIcon'
import MainPageIcon from './MainPageIcon'
import './Menu.css'
import avatar from './images/avatar.png';
import DownloadIcon from './DownloadIcon'
import ExploreIcon from './ExploreIcon'
import AddServerIcon from './AddServerIcon'
import db from './firebase';
import MobileMenu from './MobileMenuIcon'


function Menu() {
    const [servers, setServers] = useState([]);
    const history = useHistory();

    if (servers.length === 0) {
        history.push('/');
    }

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
            <div className='menu_scrollDiv'>
                <MobileMenu />

                <Link to='/' className='menu_link'>
                    <MainPageIcon image={avatar} />
                </Link>

                <div className='separator' />

                {servers.map(({ id, server }) => (
                    <Link to='/channel' className='menu_link'>
                        <ServerIcon key={id} id={id} title={server.serverName} />
                    </Link>
                ))}



                <AddServerIcon />
                <ExploreIcon />
                <div className='separator' />
                <DownloadIcon />
            </div>
        </div>
    )
}

export default Menu
