import React from 'react'
import Login from './Login/Login'
import Signup from './Signup/Signup'

function Register() {

    const [signIn, setSignIn] = React.useState(false)
    

    return (
        <div className="register">
            <div className="register__nav">
                <img 
                className="register__nav__logo"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                alt="netflixlogo" />
                <button className="register__nav__button" onClick={() => setSignIn(!signIn)}>Sign In</button>
            </div>
            <div className="register__backgroundGradient" />
                <div className="register__body">

                    {
                        signIn
                        ? 
                        <Signup signIn={signIn} setSignIn={setSignIn} />
                        :
                        
                        <Login signIn={signIn} setSignIn={setSignIn} />
                    }
                </div>
            </div>
    )
}

export default Register
