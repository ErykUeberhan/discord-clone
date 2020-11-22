import React from 'react'
import './Category.css'
import { FiChevronDown } from 'react-icons/fi'

function Category({ title }) {
    return (
        <div className='category'>
            <div className='category_title'>
                <FiChevronDown />
                <p>{title}</p>
            </div>
            <div className='category_addChannel'>
                <p>+</p>
            </div>
        </div>
    )
}

export default Category
