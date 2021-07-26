import axios from '../../../Axios/axios'
import React, { useState, useEffect } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive';


function Rows({title, fetchUrl, isLargeRow = false}) {

    const [movies, setMovies] = useState([])
    const base_Url = "https://image.tmdb.org/t/p/original/"
    useEffect(() => {
       async function fetchData (){
           const request = await axios.get(fetchUrl);
           setMovies(request.data.results.slice(10, request.data.length))
           return request;
       }
       fetchData();
    }, [fetchUrl])
   // console.log(movies)


    const [settings, setSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        cssEase: "linear",
        arrows: true
    })

    const handleBigScreen = matches =>{
        console.log("bigScreen " + matches)
        matches && setSettings({...settings,slidesToShow:5,slidesToScroll:5, arrows: true})
    }
    const handleMediumScreen = matches =>{
        console.log("mediumScreen " + matches)
        matches && setSettings({...settings,slidesToShow:4,slidesToScroll:4, arrows: true})
    }
    const handleTabScreen = matches =>{
        console.log("tabScreen " + matches)
        matches && setSettings({...settings,slidesToShow:3,slidesToScroll:3, arrows: false})
    }
    const handleSmallScreen = matches =>{
        console.log("smallScreen " + matches)
        matches && setSettings({...settings,slidesToShow:2,slidesToScroll:2, arrows: false})
    }

    const isBigScreen = useMediaQuery({ minWidth: 1600}, undefined, handleBigScreen)
    const isMediumScreen = useMediaQuery({maxWidth: 1600, minWidth: 1024}, undefined, handleMediumScreen)
    const isTabScreen = useMediaQuery({maxWidth:1024, minWidth:600}, undefined, handleTabScreen)
    const isSmallScreen = useMediaQuery({maxWidth:600}, undefined, handleSmallScreen)

        useEffect(() => {
            if(isSmallScreen){
                setSettings({...settings,slidesToShow:2,slidesToScroll:2, arrows: false})
            }
            else if(isMediumScreen){
                setSettings({...settings,slidesToShow:4,slidesToScroll:4, arrows: true})
            }
            else if(isTabScreen){
                setSettings({...settings,slidesToShow:3,slidesToScroll:3, arrows: false})
            }
            else if(isBigScreen){
                setSettings({...settings,slidesToShow:5,slidesToScroll:5, arrows: true})
            }
            // eslint-disable-next-line
        }, [])





    return (
        <div className=" container mt-5 carousel">
            <h2 className="row__title">
                {title}
            </h2>
            <Slider {...settings}>
                {
                    movies.map( item =>(
                        <div className="card-wrapper">
                            <div className="card">
                                <img 
                                className={` card-image `}
                                key={item.id}
                                alt="movie banenrs"
                                src={`${base_Url}${
                                    isLargeRow
                                    ?
                                    item.poster_path
                                    :
                                    item.movie.backdrop_path
                                }`} />
                        </div>
                        </div>
                    ))
                }    
            </Slider>
        </div>
    )
}

export default Rows
