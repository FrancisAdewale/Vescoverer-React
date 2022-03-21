import "../Login.css";
import {auth , provider, db} from '../firebase.js';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../imgs/nav-logo.png"



export default function Login() {

    const navigate = useNavigate()
    const currentUserEmail = auth.currentUser.email
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);



    useEffect(() => {
        getCoords()

    }, [])


    const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLatitude(pos.coords.latitude)
        setLongitude(pos.coords.longitude)
    };


        const signin = () => {
           auth.signInWithPopup(provider)
           .then((result) => {

            var credential = result.credential

            var name = result.user.displayName

            const splitName = name.split(" ")
            const firstName = splitName[0]
            const secondName = splitName[1]

        db.collection("users").doc(currentUserEmail).set({
            email : currentUserEmail,
            longitude : longitude,
            latitude : latitude,
            firstName : firstName,
            secondName : secondName,
            completedRegistration: false

        })
        .then(() => {
        })
        .catch(error => {
            console.log(error)
        })

        //conditon here to render register parent or dashboard parent.
            navigate("/register")
        }).catch(alert)
            
        }
    


    return (
            <div className='login-outer'>
                <nav>
                <img src={logo} className="nav-logo"/>
                <h1>Vescoverer</h1>
                </nav>

                <div className='login-middle'>
                    <div className='login-inner'>
                    <button className="google-btn" onClick={signin}>
                        Sign In with Google
                    </button>
                    </div>
                </div>
            </div>
    )
}