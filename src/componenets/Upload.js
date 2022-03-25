import React, {useState} from "react"
import {auth , provider, db} from '../firebase.js';


export default function Upload(props) {

    const [user, setUser] = useState(auth.currentUser.email)
    const hiddenFileInput = React.useRef(null);


    const handleUploadClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
    }

    const handleFileChange = event => {
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
        <form className="form-upload">
            <button className="upload-done-btn" onClick={handleUploadClick}>Upload Avatar</button>
            <input type="file" id="image" style={{
                display : "none"
            }} ref={hiddenFileInput}
            onChangeCapture={handleFileChange}
            />
            <button id="upload" className="upload-done-btn" onClick={(e) => props.callback(e)}>Next</button>
        </form>
    )
}