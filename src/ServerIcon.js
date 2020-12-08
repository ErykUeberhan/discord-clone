import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectServerId, setServerInfo, setChannelInfo, setCategoryInfo, selectCategoryId, selectChannelId } from './features/counter/appSlice';
import './ServerIcon.css'
import { BsX } from "react-icons/bs";
import db from './firebase';


function ServerIcon({ id, title }) {
    const dispatch = useDispatch();
    const serverId = useSelector(selectServerId);
    const categoryId = useSelector(selectCategoryId);
    const channelId = useSelector(selectChannelId);

    const removeServer = () => {
        const server = db.collection('servers');


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

        server.doc(serverId).delete();

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
            if (id != serverId) {
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
