import React, { useState } from 'react'


import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { auth } from '../../Firebase/firebase'
import { selectUser } from '../../Redux/userSlice'

import NavBar from '../NavBar/NavBar'
import Plans from './Plans/Plans'

function Profile() {

    const history = useHistory();

    const user = useSelector(selectUser)

    const handleSignOut = () =>{
        history.push('./Register');
        auth.signOut();
    }

    const [currentPlan, setCurrentPlan] = useState('None')

    return (
        <div className="profile">
            <NavBar />
                
            <div className="profile__body">
                <div className="profile__body__avatar">
                    <img 
                        src="https://occ-0-1242-64.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZfW1RUr22fiBWaYExj7CxON4XhbCzdXecA3cogZ0L2umPLeF1G2CRjQOqJ4DsYba55_ydC_mMzPhNI-1lGWzjg.png?r=9fe" 
                        alt="logoImage" 
                        className="profile__body__info__image" 
                        />
                </div>

                <div className="profile__body__detail">
                    <div className="profile__body__detail__email">{user.email}</div>
                    <div className="profile__body__detail__heading">Current plan : (<span>{currentPlan}</span>)</div>
                    <Plans setCurrentPlan = {setCurrentPlan} />
                    <button onClick={handleSignOut} className="profile__body__detail__signoutButton">
                        Signout
                    </button>
                </div>
            
            </div>
        </div>
    )
}

export default Profile
