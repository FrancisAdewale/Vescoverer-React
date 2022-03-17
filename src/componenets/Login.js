import React from "react";
import "../Login.css";
import {auth , provider} from '../firebase.js';
import { Navigate, useNavigate } from "react-router-dom";



export default function Login() {

    const navigate = useNavigate()


        const signin = () => {
           const result = auth.signInWithPopup(provider).then(() => {
            navigate("/register")
           })
           .catch(alert)
          
            
        }
    


    return (
            <div className='login-outer'>
                <nav>Vescoverer</nav>

                <div className='login-middle'>
                    <div className='login-inner'>
                    <button style={{"marginTop" : "200px"}} 
                onClick={signin}>Sign In with Google</button>
                    </div>
                </div>
            </div>
    )
}