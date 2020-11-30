import React, { useEffect, useState } from 'react'
import './Category.css'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import Channel from './Channel'
import db from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategoryId, setCategoryInfo } from './features/counter/appSlice'
import firebase from 'firebase'
import { BsX, BsPlus } from "react-icons/bs";

function Category({ id, title }) {
    const categoryId = useSelector(selectCategoryId)
    const [channels, setChannels] = useState([])
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Add channel:');
        if (channelName) {
            db.collection('categories').doc(categoryId).collection('channels').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                channelName: channelName,
            });
        }
    }

    const removeChannel = () => {
        const category = db.collection('categories').doc(categoryId);
        const channel = db.collection('categories').doc(categoryId).collection('channels');
        channel.get().then(res => {
            res.forEach(element => {
                element.ref.delete();
            });
        });
        category.delete();
    }

    useEffect(() => {
        if (categoryId) {
            db.collection('categories').doc(categoryId).collection('channels').orderBy('timestamp').onSnapshot((snapshot) =>
                setChannels(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))));
        }

    }, [categoryId])
    return (
        <div className='category' onClick={() => {
            dispatch(
                setCategoryInfo({
                    categoryId: id,
                    categoryName: title,
                })
            )
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
                            <BsX className='category_header_menu_remove' onClick={removeChannel} />
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
