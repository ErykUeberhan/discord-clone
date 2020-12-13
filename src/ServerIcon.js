import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectServerId, setServerInfo, setChannelInfo, setCategoryInfo } from './features/counter/appSlice';
import './ServerIcon.css'
import { BsX } from "react-icons/bs";
import db from './firebase';


function ServerIcon({ id, title }) {
    const dispatch = useDispatch();
    const serverId = useSelector(selectServerId);

    const removeServer = () => {
        const server = db.collection('servers');

        // remove data belonging to this server
        server.doc(serverId).collection('categories').get().then((res) => {
            res.forEach((element) => {
                element.ref.collection('channels').get().then((res) => {
                    res.forEach((element) => {
                        element.ref.collection('messages').get().then((res) => {
                            res.forEach((element) => {
                                element.ref.delete();
                            });
                            element.ref.delete();
                        });
                        element.ref.delete();
                    });
                    element.ref.delete();
                });
                element.ref.delete();
            });
        });

        // delete server
        server.doc(serverId).delete();

        // set local info about removed data to null
        dispatch(
            setChannelInfo({
                channelId: null,
            })
        )

        dispatch(
            setCategoryInfo({
                categoryId: null,
            })
        )

        dispatch(
            setServerInfo({
                serverId: null,
            })
        )
    }
    return (
        <div className='serverIcon' onClick={() => {
            // send info about choosen server
            if (id !== serverId) {
                dispatch(
                    setChannelInfo({
                        channelId: null,
                        channelName: null,
                    })
                )

                dispatch(
                    setCategoryInfo({
                        categoryId: null,
                        channelName: null,
                    })
                )

                dispatch(
                    setServerInfo({
                        serverId: id,
                        serverName: title,
                    })
                )
            }

        }}>
            <p className='serverIcon_title'>{title ? title[0] : null}</p>
            {
                id === serverId ?
                    <div className='serverIcon_remove' onClick={removeServer}><BsX /></div>
                    :
                    null
            }

        </div >
    )
}

export default ServerIcon
