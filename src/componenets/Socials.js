import React from "react"
import {auth , provider, db} from '../firebase.js';
import twitter from "../imgs/twitter.png"
import instagram from "../imgs/instagram-256.png"

export default function Socials(props) {

    const user = auth.currentUser.email

    const handleInstagram = () => {

        const instagram = prompt("What is your Instagram? Without @ symbol")
        db.collection("users").doc(user).set({
            instagram : instagram
        }, { merge: true })

    }

    const handleTwitter = () => {
        const twitter = prompt("What is your Twitter? Without @ symbol")
        db.collection("users").doc(user).set({
            twitter : twitter
        }, { merge: true })

    }



    return (
        <>
            <div className="socials-container">
            <img src={instagram} className="reg-instagram" onClick={handleInstagram}/>
            <img src={twitter} className="reg-twitter" onClick={handleTwitter}/>
            </div>
            <button className="home-done-btn" id="socials" onClick={(e) => props.callback(e)}>Done</button>
        </>
        

    )
}