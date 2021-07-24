import React, {useState, useEffect} from 'react'
import Rows from './Rows'
import requests from '../../../Axios/request'
import axios from '../../../Axios/axios'
// import axios from 'axios'
function RowsContainer() {


    const loadStuff = async () => {
        const request1 = await axios.get(requests.fetchTopRated);
        console.log(request1.data);
    };


    return (
        <div>
            <Rows 
                title='Now Playing'
                fetchUrl = {requests.fetchNowPlaying}
                isLargeRow
            />
            <Rows 
                title='Trending'
                fetchUrl = {requests.fetchTrending}
                isLargeRow
            />
            <Rows 
                title='Top Rated'
                fetchUrl = {requests.fetchTopRated}
                isLargeRow
            />
            <Rows 
                title='Up Coming'
                fetchUrl = {requests.fetchUpComing}
                isLargeRow
            />

        </div>
    )
}

export default RowsContainer
