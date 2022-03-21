import React from "react"
import {auth , provider, db} from '../firebase.js';


export default function Upload(props) {

    const user = auth.currentUser.email

    const handleImageUpload = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {

                db.collection("users").doc(user).set({
                    imagePath : e.target.result
            
                    }, { merge: true })
            };
            reader.readAsDataURL(event.target.files[0]);
          }

    }

    return (
        <form>
            <input type="file" onChange={handleImageUpload}/>
            <button id="upload" className="home-done-btn" onClick={(e) => props.callback(e)}>Next</button>
        </form>
    )
}