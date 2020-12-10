import React, { useLayoutEffect, useState } from 'react'
import './MobileMenuIcon.css'
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { selectMobileMenu, setMobileVersion } from './features/counter/appSlice';


function MobileMenuIcon() {
    const dispatch = useDispatch();
    const mobileMenu = useSelector(selectMobileMenu);

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }


    const [width] = useWindowSize();

    if (width >= 740) {
        dispatch(
            setMobileVersion({
                mobileMenu: null,
            })
        );
    }
    return (
        <div className='mobileMenuIcon' onClick={() => {
            dispatch(
                setMobileVersion({
                    mobileMenu: !mobileMenu,
                })
            ); console.log(width)
        }}>
            <GiHamburgerMenu className='mobileMenuIcon_icon' />
        </div>
    )
}

export default MobileMenuIcon
