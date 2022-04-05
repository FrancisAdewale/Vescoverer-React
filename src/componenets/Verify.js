import React, {useState, useEffect, useRef, forwardRef} from "react"
import {auth, provider, storage, db} from "../firebase";
import SpoonPic from "../imgs/spoonpic.jpg"
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


export default function Verify(props) {

    const user = auth.currentUser.email

    const [result, setResult] = useState(null) 
    const [isVerified, setIsVerfied] = useState(null)

    return (
        <div className="verify-container">

            {
                props.verified || props.uploaded ?

                <img src={SpoonPic} style={{
                    width : "200px",
                    height: "200px",
                    opacity: "0.2",
                    borderRadius: "20px"

                }} />

                :
                <img className="unverified" src={SpoonPic} style={{
                    width : "200px",
                    height: "200px"
                }} onClick={(e) => props.handleUploadClick(e)}/>
            }
            <input type="file" id="verify" style={{
                display : "none"
            }} ref={props.forwardedRef}
            onChangeCapture={(e) => props.handleVerifyImage(e)}
            />
            {
                props.verified 
                ?
                <DoneOutlineIcon 
                style={{
                    width: "70px",
                    height: "70px",
                    display: "block",
                    margin: "10 auto",
                    color : "#3797A4"
                }}
                />
                :
                <h3>{props.uploaded ? "Reviewing....check back later" : "Upload a spoon pic"}</h3>
            }
            
        </div>
    )
}