import React, { useEffect, useState } from 'react'
import './Category.css'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { FaHashtag } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
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
    const [channelName, setChannelName] = useState('');
    const [channelPrompt, setChannelPrompt] = useState(false);
    const dispatch = useDispatch();

    // add channel to database
    const addChannel = () => {
        if (channelName) {
            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                channelName: channelName,
            });
        }
    }

    // remove category from database
    const removeCategory = () => {
        const category = db.collection('servers').doc(serverId).collection('categories').doc(categoryId);
        const channel = category.collection('channels');

        // remove data belonging to this category
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

        // delete category
        category.delete();

        // set local info about removed data to null
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

    // insert data from database to channels array
    useEffect(() => {
        if (categoryId) {
            db.collection('servers').doc(serverId).collection('categories').doc(categoryId).collection('channels').orderBy('timestamp').onSnapshot((snapshot) =>
                setChannels(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))));
        }

    }, [categoryId, serverId])
    return (
        <div className='category' onClick={() => {
            // send info about choosen category
            if (id !== categoryId) {
                dispatch(
                    setChannelInfo({
                        channelId: null,
                        channelName: null,
                    })
                )

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
                            <BsPlus className='category_header_menu_add' onClick={() => setChannelPrompt(true)} />
                            <BsX className='category_header_menu_remove' onClick={removeCategory} />
                        </>
                        : null
                    }
                </div>
                {
                    channelPrompt
                        ?
                        <div className='category_prompt' onClick={(e) => e.stopPropagation()}>
                            <div className='category_prompt_field'>
                                <p className='category_prompt_field_title'>Create Channel</p>
                                <div className='category_prompt_field_choose'>
                                    <p className='category_prompt_field_choose_title'>CHANNEL TYPE</p>
                                    <label className='category_prompt_field_choose_textChannel'>
                                        <input type='radio' name='channel' />
                                        <span className='category_prompt_field_choose_textChannel_radiomark'></span>
                                        <FaHashtag />
                                        <p>Text Channel</p>
                                    </label>
                                    <label className='category_prompt_field_choose_voiceChannel'>
                                        <input type='radio' name='channel' />
                                        <span className='category_prompt_field_choose_voiceChannel_radiomark'></span>
                                        <GoUnmute />
                                        <p>Voice Channel</p>
                                    </label>
                                </div>
                                <div className='category_prompt_field_insert'>
                                    <p className='category_prompt_field_insert_title'>CHANNEL NAME</p>
                                    <input className='category_prompt_field_insert_input' onChange={(e) => setChannelName(e.target.value)} />
                                </div>
                                <div className='category_prompt_field_buttons'>
                                    <button className='category_prompt_field_buttons_cancel' onClick={() => setChannelPrompt(false)}>Cancel</button>
                                    <button className='category_prompt_field_buttons_submit' onClick={() => { if (channelName.length > 0) addChannel(); setChannelPrompt(false) }}>Create</button>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            <div className='category_channels'>
                {// render channels from array
                    id === categoryId
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
