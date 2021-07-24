import React from 'react'
import Banner from './Banner/Banner'
import NavBar from '../NavBar/NavBar'
import RowsContainer from './Row/RowsContainer'

function HomeScreen() {
    return (
        <div className="homeScreen">
            
            {/* TODO NavBar */}
                <NavBar />

            {/* TODO Banner */}
                <Banner />

            {/* TODO Row */}
            <div className="homeScreen__rowContainer">
                <RowsContainer />
            </div>
        </div>
    )
}

export default HomeScreen
