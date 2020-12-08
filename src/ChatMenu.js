import React from 'react'
import './ChatMenu.css'
import { AiFillBell, AiFillPushpin, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { CgInbox } from "react-icons/cg";
import { IoMdHelpCircle } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryId, selectChannelId, selectChannelName, selectServerId, setChannelInfo } from './features/counter/appSlice';

function ChatMenu({ title }) {
    const dispatch = useDispatch();
    const channelName = useSelector(selectChannelName);
    const serverId = useSelector(selectServerId);
    const categoryId = useSelector(selectCategoryId);
    const channelId = useSelector(selectChannelId);

    return (
        <div className='chatMenu'>
            <div className='chatMenu_left'>
                <FaHashtag />
                <p className='chatMenu_left_title'>{channelName}</p>
            </div>
            <div className='chatMenu_right'>
                <AiFillBell className='chatMenu_right_navIcon' />
                <AiFillPushpin className='chatMenu_right_navIcon' />
                <BsFillPersonFill className='chatMenu_right_navIcon' />
                <input className='chatMenu_right_searchBar' type='text' placeholder='Search' />
                <AiOutlineSearch className='chatMenu_right_searchIcon' />
                <CgInbox className='chatMenu_right_navIcon' onClick={() => dispatch(setChannelInfo({ channelId: null }))} />
                <IoMdHelpCircle className='chatMenu_right_navIcon' onClick={() => console.log(`${serverId} | ${categoryId} | ${channelId}`)} />
            </div>
        </div>
    )
}

export default ChatMenu
