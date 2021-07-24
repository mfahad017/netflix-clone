import React, {useEffect} from 'react'

import { useDispatch } from 'react-redux';
import {logout} from '../../Redux/userSlice'
import { useHistory } from 'react-router-dom';

import {auth} from "../../Firebase/firebase"

function NavBar() {
    const dispatch = useDispatch();


    const handleLogout = () =>{
        console.log("logout")
        dispatch(logout)
    }


    const [show, handleShow] = React.useState(false);

    const transitionNavBar = () =>{
        if(window.scrollY > 50){
            handleShow(true)
        }
        else{
            handleShow(false)
        }
    }
    React.useEffect (() =>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    const history = useHistory();

    const handleLogoClick = () =>{
        history.push('./')
    }
    const handleAvatarClick = () =>{
        history.push('./profile')
    }

    return (
        <div className={`navBar${show ? ` navBar__black`:``}`}>
            <div className="navBar__content">
                <img 
                className="navBar__content__logo"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                alt="netflixlogo" 
                onClick={handleLogoClick}
                />
                <img 
                className="navBar__content__avatar"
                src="https://occ-0-1242-64.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZfW1RUr22fiBWaYExj7CxON4XhbCzdXecA3cogZ0L2umPLeF1G2CRjQOqJ4DsYba55_ydC_mMzPhNI-1lGWzjg.png?r=9fe" 
                alt="profileavatar"
                onClick={handleAvatarClick}
                />
            </div>
        </div>
    )
}

export default NavBar
