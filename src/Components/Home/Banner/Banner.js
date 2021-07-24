
import React,{useState, useEffect, useRef} from 'react'

import axios from '../../../Axios/axios'
import requests from '../../../Axios/request'
//NOTE Images
import banner from './LukeCage/lukeCageBanner.jpg'
import logo from './blackWidowLogo.png'
import video from './blackWidowVideo.mp4'

//NOTE Icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/Info';
import { useMediaQuery } from 'react-responsive'

function Banner() {

    

    const [trailerPlaying, handleTrailerPlaying] = useState(false)

    const [movie, setMovie] = useState(null)

    const [playedOnce, setPlayedOnce] = useState(false)


    useEffect(() => {
        const fetchData = async () =>{
            const request = await axios.get(requests.fetchBlackWidow)
            setMovie(request.data)
            return request;
        }
        fetchData();
    }, [])
    //console.log(movie.tagline)
    useEffect(() => {

        setTimeout(() => {
            if(!isSmallScreen ){
                handleTrailerPlaying(true)
            }
        }, 10000)
  
      }, []);

    const truncate = (string, n) =>{
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;   
    }
    
    const dis = "A hoodie-wearing, unbreakable ex-con fights to clear his name and save his neighborhood. He wasn't looking for a fight, but the people need a hero.A hoodie-wearing, unbreakable ex-con fights to clear his name and save his neighborhood. He wasn't looking for a fight, but the people need a hero."
    //
    const image = `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
    const bannerBackground = {
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize:"cover",
        backgroundPosition: "center center"
    };


    const vid = useRef()
    const [sound, setSound] = useState(false)
    useEffect(() => {
        
        if(vid.current){
            setSound(vid.current.muted)
            console.log(sound)
        }
        
    }, [vid.current])

    const handleSound = () => {
        if(trailerPlaying){
            vid.current.muted = !vid.current.muted
            setSound(!sound)
        }
    }

    const trailerEnd = () => {
        setPlayedOnce(true)
        handleTrailerPlaying(false)
    }

    const handlePlayAgain = () => {
        vid.current.play()
        handleTrailerPlaying(true)
    }
    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isMediumScreen = useMediaQuery({maxWidth: 1300})
    const isSmallScreen = useMediaQuery({maxWidth:600})
    


    return (

    movie
       ? <div className="banner">
            { !isSmallScreen &&
                <div className={`banner__video ${trailerPlaying ? "banner__video-show" : "banner__video-hide"}`}>
                    <video    onEnded={trailerEnd} id="myvid" ref={vid} className="banner__video-player" autoPlay={true} muted>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            }
            <img className={`banner__image ${!trailerPlaying ? `banner__image-show` : `banner__image-hide`}`} src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" />
            <div className="banner__content">
                <div className="banner__content__info">
                    <div className="banner__content__info__logo">
                        <img 
                        className={`banner__content__info__logo__img ${trailerPlaying ? "banner__content__info__logo__img-small" : "banner__content__info__logo__img-large"}`}
                        src={logo} 
                        alt="logoOfSeries" />
                    </div>
                    <div className={`banner__content__info__description ${!trailerPlaying ? `banner__content__info__description-show`:`banner__content__info__description-hide`}`}>
                        <h1 className="banner__content__info__description-text">
                            {truncate(movie.tagline, 89)}
                        </h1>
                    </div>
                </div>
                
                <div className="banner__content__button">
                    <button onClick={handleSound} className="banner__content__button__general banner__content__button-play"><PlayArrowIcon className="banner__content__button-play-icon"/> Play</button>
                    <button className="banner__content__button__general banner__content__button-moreInfo"><InfoIcon className="banner__content__button-moreInfo-icon" /> More Info</button>
                </div>
            </div>
            <div className="banner__age">
                {
                    movie.adult ?
                    <p>18+</p>
                    :
                    <p>for all ages</p>
                }
            </div>
            <div className="banner__sound">
                {
                    trailerPlaying 
                    ?
                        sound
                        ?
                            <VolumeOffIcon className="banner__sound__icon"  onClick={handleSound} />
                        :
                            <VolumeUpIcon className="banner__sound__icon" onClick={handleSound}/>

                    :
                        playedOnce 
                        ?
                            <RefreshIcon className="banner__sound__icon" onClick={handlePlayAgain} />
                        :
                            null


                } 

            </div>

            <div className="banner-fadeBottom" />
        </div>
        :null  
        )
}

export default Banner
