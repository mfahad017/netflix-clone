import React,{useState, useRef} from 'react'
import { useHistory } from 'react-router'
import {auth} from "../../../Firebase/firebase"
function Signup({signIn, setSignIn}) {
    const reset = React.useRef()
    const emailRef = useRef(null)
    const passRef = useRef(null)
    
    const history = useHistory();

    const signUpForm = (e) =>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passRef.current.value
        )
        .then((authUser)=>{
            console.log(authUser)
            history.push("./")
        })
        .catch( error => {
            console.error(error)
        });
    }


    const signInForm = (e) =>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passRef.current.value
        )
        .then( authUser =>{
            console.log(authUser)
            setSignIn(true)
            history.push("./")
        })
        .catch( error =>{
            console.error(error)
        })
        
    }

    return (
        <div className="signup">
            <form ref={reset}  className="signup__form">
                <h1 className="signup__form__title">Sign In</h1>
                <input 
                ref={emailRef}
                type="email" 
                className="signup__form__input signup__form__input__email" 
                placeholder="Enter Full Name"
                required
                />
                <input 
                ref={passRef}
                type="password" 
                className="signup__form__input signup__form__input__password" 
                placeholder="Enter Password"
                required
                />
                <button type="submit" className="signup__form__button" onClick={signInForm} >Sign In</button>
            </form>
            <div className="signup__extraLink">
                <span className="signup__extraLink__preLink">New to Netflix?</span>
                <span className="signup__extraLink__link" onClick={signUpForm}><a>Sign up now.</a></span>
            </div>
        </div>
    )
}

export default Signup
