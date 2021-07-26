import React from 'react'

function Login({signIn, setSignIn, setEmailPass}) {
    return (
        <div className="login">
            <h1 className="login__title">Unlimited films, TV programmes and more.</h1>
            <h2 className="login__subTitle">Watch anywhere. Cancel anytime.</h2>
            <h3 className="login__info">Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className="login__input">
                <form className="login__input__form">
                    <input 
                    type="email" 
                    className="login__input__form__field" 
                    placeholder="Enter Your Email"
                    onChange={(e)=>setEmailPass(e.target.value)}
                    />
                    <button 
                    className="login__input__form__button" 
                    onClick={() => setSignIn(!signIn)}
                    >
                        GET STARTED
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
