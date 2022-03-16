import React from "react"
import "../Login.css"
import GoogleLogin from 'react-google-login';



export default function Login() {

    const responseGoogle = (response) => {
        console.log(response);
      }

    return (
            <div className='login-outer'>
                <nav>Vescoverer</nav>

                <div className='login-middle'>
                    <div className='login-inner'>
                    <GoogleLogin
                    clientId="932286838218-cie8hb1a9ev1l2b9u4cgock1i7mphmfn.apps.googleusercontent.com"
                    buttonText="Login / Sign up"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
                    </div>
                </div>
            </div>
    )
}