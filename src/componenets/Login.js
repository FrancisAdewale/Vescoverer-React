import "../Login.css";
import {auth , provider, db} from '../firebase.js';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../imgs/nav-logo.png"



export default function Login() {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [completedReg, setCompletedReg] = useState(false)
    


    
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
                    

                    db.collection("users").doc(result.user.email).get()
                    .then(doc => {
                        if (doc.exists) {

                            if(doc.data().completedRegistration) {
                                navigate("/dashboard")
                            } else {

                                var credential = result.credential
     
                                var name = result.user.displayName
               
                                setUser(result.user.email)
               
                                   const splitName = name.split(" ")
                                   const firstName = splitName[0]
                                   const secondName = splitName[1]
                       
                               db.collection("users").doc(result.user.email).set({
                                   email : result.user.email,
                                   longitude : longitude,
                                   latitude : latitude,
                                   firstName : firstName,
                                   secondName : secondName,
                                   completedRegistration: false
                       
                               })
                               .catch(error => {
                                   console.log(error)
                               })
                       
                                   navigate("/register")

                            }
                            
                            
                        } else {
                            navigate("/register")

                        }
                    })
                    
                    .catch(error => {
                        console.log(error)
                    })

                

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