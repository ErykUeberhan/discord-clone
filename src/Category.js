import React, { useEffect, useState } from 'react'
import './Category.css'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import Channel from './Channel'
import db from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategoryId, selectServerId, setCategoryInfo, setChannelInfo } from './features/counter/appSlice'
import firebase from 'firebase'
import { BsX, BsPlus } from "react-icons/bs";

function Category({ id, title }) {
    const categoryId = useSelector(selectCategoryId)
    const serverId = useSelector(selectServerId)
    const [channels, setChannels] = useState([])
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Add channel:');
        if (channelName) {
            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                channelName: channelName,
            });
        }
    }

    const removeCategory = () => {
        const category = db.collection('servers').doc(serverId).collection('categories').doc(categoryId);
        const channel = category.collection('channels');
        channel.get().then((res) => {
            res.forEach((element) => {
                element.ref.collection('messages').get().then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                    element.ref.delete();
                });
                element.ref.delete();
            });
        });

        category.delete();

        dispatch(
            setChannelInfo({
                channelId: null,
            })
        );

        dispatch(
            setCategoryInfo({
                categoryId: null,
            })
        );
    }

    useEffect(() => {
        if (categoryId) {
            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').orderBy('timestamp').onSnapshot((snapshot) =>
                setChannels(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))));
        }

    }, [categoryId])
    return (
        <div className='category' onClick={() => {
            if (id != categoryId) {
                dispatch(
                    setCategoryInfo({
                        categoryId: id,
                        categoryName: title,
                    })
                )
            }

        }}>
            <div className='category_header'>
                <div className='category_header_title'>
                    {id === categoryId
                        ?
                        <FiChevronDown />
                        :
                        <FiChevronRight />
                    }
                    <p>{title}</p>
                </div>
                <div className='category_header_menu'>
                    {id === categoryId
                        ?
                        <>
                            <BsPlus className='category_header_menu_add' onClick={addChannel} />
                            <BsX className='category_header_menu_remove' onClick={(e) => { e.stopPropagation(); removeCategory() }} />
                        </>
                        : null
                    }
                </div>
            </div>
            <div className='category_channels'>
                {id === categoryId
                    ?
                    channels.map(({ id, channel }) => (
                        <Channel key={id} id={id} title={channel.channelName} />
                    ))
                    : null
                }
            </div>
        </div>
    )
}

export default Category
