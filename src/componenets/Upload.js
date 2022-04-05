import React, {useState, useRef} from "react"
import {auth , provider, db} from '../firebase.js';
import upload from "../imgs/upload.png"
import Tooltip from '@mui/material/Tooltip';



export default function Upload(props) {

    const [user, setUser] = useState(auth.currentUser.email)
    const hiddenFileInput = useRef(null);

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
      setOpen(false);
    };


    const handleUploadClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
    }

    const handleFileChange = event => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setOpen(true);
                db.collection("users").doc(user).set({
                    imagePath : e.target.result
            
                    }, { merge: true })
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }


    return (
        <form className="form-upload">
             <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Uploaded">
                    <img src={upload} onClick={handleUploadClick} style={{width: "130px", height : "130px"}}/>
                  </Tooltip>
            
            <input type="file" id="image" style={{
                display : "none"
            }} ref={hiddenFileInput}
            onChangeCapture={handleFileChange}
            />
            <button id="upload" className="upload-done-btn" onClick={(e) => props.callback(e)}>Next</button>
        </form>
    )
}