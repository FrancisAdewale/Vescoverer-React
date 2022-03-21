import { findByAltText } from "@testing-library/react";
import React, {useEffect, useState} from "react"
import {auth , provider, db} from '../firebase.js';


export default function Name(props) {

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")


    const user = auth.currentUser.email
    const firstEle = document.getElementById("firstName")
    const secondEle = document.getElementById("secondName")

    useEffect(() => {
        db.collection("users").doc(user).get()
        .then(doc => {
            if (doc.exists) {

                setFirstName(doc.data().firstName)
                setSecondName(doc.data().secondName)

                firstEle.value = firstName
                secondEle.value = secondName
            }
        })
        .catch(error => {
            console.log(error)
        })

    }, [firstName, secondName])
        
      
   
  


   const handleFirstName = () => {

    db.collection("users").doc(user).set({
        firstName : firstEle.value

        }, { merge: true })
   }

   const handleSecondName = () => {
    db.collection("users").doc(user).set({
        secondName : secondEle.value

        }, { merge: true })
   }




    return (
        <form className="form--fullname">
            <input id="firstName" type="text" placeholder="First Name" onChange={handleFirstName} />
            <input id="secondName" type="text" placeholder="Second Name" onChange={handleSecondName} />
            <button className="name-done-btn" id="name" onClick={(e) => props.callback(e)}>Next</button>

        </form>
    )
}