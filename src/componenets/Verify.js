import React, {useState, useEffect, useRef, forwardRef} from "react"
import {auth, provider, storage, db} from "../firebase";
import SpoonPic from "../imgs/spoonpic.jpg"
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


export default function Verify(props) {

    const user = auth.currentUser.email

    const [result, setResult] = useState(null) 
    const [isVerified, setIsVerfied] = useState(null)


    // const storageRef =  storage.ref()

    // useEffect(() => {
    //     db.collection("users").doc(user).get()
    //     .then(doc => {
    //         if (doc.exists) {
    //            setIsVerfied(doc.data().isVerified)
    //            setResult(doc.data().uploadedVerifyImage)
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    // }, [result, isVerified])

  



    // const handleUploadClick = event => {
    //     event.preventDefault()
    //     hiddenFileInput.current.click();
    // }

    // const handleVerifyImage = event => {
    //     if (event.target.files && event.target.files[0]) {
    //         let reader = new FileReader();
    //         reader.onload = (e) => {

    //            const imageRef = storageRef.child(`\\${user}`).child("spoonpic.jpg")
    //            const file = e.target.result
    //            imageRef.put(file).then(() => {
    //                console.log("image added")
    //                setResult(prevResult => true)

    //                db.collection("users").doc(user).set({
    //                 uploadedVerifyImage: true
            
    //                 }, { merge: true })

    //            })
    //            .catch(error => console.log(error))

    //         };
    //         reader.readAsDataURL(event.target.files[0]);
    //       }

     

       
    // }

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
                props.verified ?

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