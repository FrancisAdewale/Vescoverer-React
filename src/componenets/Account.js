import { Margin, PropaneSharp } from "@mui/icons-material"
import React, {useEffect, useState, useReducer} from "react"
import AccInstaIcon from "../imgs/account-instagram.png"
import AccTwitterIcon from "../imgs/account-twitter.png"
import Geocode from "react-geocode";
import Tooltip from '@mui/material/Tooltip';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditPopUp from "./EditPopUp";
import {auth , provider, db} from '../firebase.js';
import { Navigate, useNavigate } from "react-router-dom";


export default function Account(props) {

    const navigate = useNavigate()


    const [isOpen, setIsOpen] = useState(false);
    const [editFirstname, setEditFirstName] = useState('')
    const [editSecondName, setEditSecondName] = useState('')
    const [editInstagram, setEditInstagram] = useState('')
    const [editTwitter, setEditTwitter] = useState('')
    const hiddenFileInput = React.useRef(null);
    const [newImage, setNewImage] = useState('')



    const user = auth.currentUser.email


 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

    const handleEdit = () => {

        setIsOpen(!isOpen)

    }

  

    const handleUploadClick = event => {

        event.preventDefault()
        hiddenFileInput.current.click();
        
      };

    const handleChange = event => {

        const {id, value} = event.target

        switch(id) {
            case "firstName":
                setEditFirstName(value)
            case "secondName":
                setEditSecondName(value)
            case "instagram":
                setEditInstagram(value)
            default:
                setEditTwitter(value)
        }

    }

    const handleFileChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {

                setNewImage(e.target.result)
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }  

    const logout = () => {

        auth.signOut()
        .then(() => {
            navigate("/login")

        })
        .catch(error => {
            console.log(error)
        })
    }

    const deleteAcc = () => {
        db.collection("users").doc(user).delete().then(() => {
            console.log("Document successfully deleted!");
            navigate("/login")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    






    return (
            <table>
                <thead>
                    <tr>
                    <th scope="row" colSpan={2}>
                        <Tooltip title="Edit Account">
                        <ModeEditOutlineOutlinedIcon onClick={handleEdit}/>
                        </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" colSpan={2}><img className="account--avatar" src={props.imgPath}/><h3 id="acc-full-name">{(props.firstName !== undefined &&
                        props.secondName !== undefined) ? `${props.firstName} ${props.secondName}` : "" }</h3>  </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}><h3>{props.age !== undefined ? props.age : ""}</h3></th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> <h3>{`Vegan For: ${props.veganFor !== undefined ? props.veganFor : ""}`}</h3> </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}></th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> <h3>{props.gender}</h3> </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> 
                        <Tooltip title={`@${props.instagram}`}>
                        <img src={AccInstaIcon} style={{
                            display: "inline-block",
                            margin: " 0 40px"
                            
                        }}/>

                        </Tooltip>

                        <Tooltip title={`@${props.twitter}`}>
                        <img src={AccTwitterIcon} style={{
                            display: "inline-block",
                            margin: " 0 40px"

                        }}/> 
                        </Tooltip>
                        
                    </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}><h3>{props.address}</h3></th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <th scope="row" colSpan={2}><button style={{backgroundColor: "#3797A4"}} onClick={logout}>Sign Out</button> 
                    <button style={{backgroundColor : "red", marginLeft : "16px"}} onClick={deleteAcc}>Delete Account</button></th>
                    </tr>
                </tfoot>
                {isOpen && <EditPopUp
      content={<>
        <form className="form--popup">
            <legend><h3>Edit Account</h3></legend>
            <input type="text" id="firstName" placeholder={props.firstName} onChange={handleChange}/>
            <input type="text" id="secondName" placeholder={props.secondName }  onChange={handleChange}/>
            <input type="text" id="instagram"placeholder={props.instagram}onChange={handleChange}/>
            <input type="text" id="twitter"placeholder={props.twitter} onChange={handleChange}/>
            <button className="home-done-btn" onClick={handleUploadClick}>New Avatar</button>
            <input type="file" id="image" style={{
                display : "none"
            }} ref={hiddenFileInput}
            onChangeCapture={handleFileChange}
            />
            <button 
            onClick={(e) => props.updateParent(e, editFirstname, editSecondName, editTwitter, editInstagram, newImage)}>Done</button>

        </form>
        
      </>}
      handleClose={togglePopup}
    />}

    
            </table>

            
    )
}