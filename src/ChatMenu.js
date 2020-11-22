import React from 'react'
import './ChatMenu.css'
import { AiFillBell, AiFillPushpin, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { CgInbox } from "react-icons/cg";
import { IoMdHelpCircle } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";

function ChatMenu({ title }) {
    return (
        <div className='chatMenu'>
            <div className='chatMenu_left'>
                <FaHashtag />
                <p className='chatMenu_left_title'>{title}3</p>
            </div>
            <div className='chatMenu_right'>
                <AiFillBell className='chatMenu_right_navIcon' />
                <AiFillPushpin className='chatMenu_right_navIcon' />
                <BsFillPersonFill className='chatMenu_right_navIcon' />
                <input className='chatMenu_right_searchBar' type='text' placeholder='Search' />
                <AiOutlineSearch className='chatMenu_right_searchIcon' />
                <CgInbox className='chatMenu_right_navIcon' />
                <IoMdHelpCircle className='chatMenu_right_navIcon' />
            </div>
        </div>
    )
}

export default ChatMenu
