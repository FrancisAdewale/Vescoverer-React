import { Margin, PropaneSharp } from "@mui/icons-material"
import React, {useEffect, useState} from "react"
import AccInstaIcon from "../imgs/account-instagram.png"
import AccTwitterIcon from "../imgs/account-twitter.png"
import Geocode from "react-geocode";
import Tooltip from '@mui/material/Tooltip';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import EditPopUp from "./EditPopUp";





export default function Account(props) {

    const [address, setAddress] = useState("")
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
    const lng = props.lng
    const lat = props.lat

    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);

    Geocode.setLanguage("en");


    Geocode.setRegion("en");

    Geocode.setLocationType("APPROXIMATE");

    Geocode.enableDebug();

    useEffect(() => {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[5].formatted_address;
                setAddress(address)
            },
            (error) => {
                console.error(error);
            }
            );

    }, [])

    const handleEdit = () => {

        setIsOpen(!isOpen)

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
                    <th scope="row" colSpan={2}><img className="account--avatar" src={props.imgPath}/><h3>{`${props.firstName} ${props.secondName}`}</h3>  </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}><h3>{props.age}</h3></th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> <h3>{`Vegan For: ${props.veganFor}`}</h3> </th>
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
                    <th scope="row"colSpan={2}><h3>{address}</h3></th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <th scope="row" colSpan={2}><button style={{backgroundColor: "#3797A4"}}>Sign Out</button> 
                    <button style={{backgroundColor : "red"}}>Delete Account</button></th>
                    </tr>
                </tfoot>
                {isOpen && <EditPopUp
      content={<>
        <form className="form--popup">
            <legend><h3>Edit Account</h3></legend>
            <input type="text" placeholder="First Name" value={props.firstName}/>
            <input type="text" placeholder="Second Name" value={props.secondName}/>
            <input type="text" placeholder="Instagram" value={props.instagram}/>
            <input type="text" placeholder="Twitter" value={props.twitter}/>
            <input type="file"/>
            <button>Test button</button>

        </form>
        
      </>}
      handleClose={togglePopup}
    />}
            </table>

            
    )
}