import React from 'react'
import Rows from './Rows'
import requests from '../../../Axios/request'

function RowsContainer() {




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
