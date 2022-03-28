import React, {useState, useEffect} from "react"
import {auth , provider, db} from '../firebase.js';
import VescoveredUser from "./VescoveredUser.js";
import ViewUserPopUp from "./ViewUserPopUp.js";
import Tooltip from '@mui/material/Tooltip';
import AccInstaIcon from "../imgs/account-instagram.png"
import AccTwitterIcon from "../imgs/account-twitter.png"
import Geocode from "react-geocode";


export default function Vescovered() {

    const [vescoveredUsers, setVescoveredUsers] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const [address, setAddress] = useState("")


    const lng = userDetails.longitude
    const lat = userDetails.latitude
   
    const user = auth.currentUser.email

    Geocode.setApiKey("AIzaSyA3RqIQZzvJfUWxsicl_YAalCTqI0zgp7I");
    Geocode.setLanguage("en");
    Geocode.setRegion("en");
    Geocode.setLocationType("APPROXIMATE");
    Geocode.enableDebug();

    useEffect(() => {

        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[2].formatted_address;
                setAddress(address)
            },
            (error) => {
                console.error(error);
            }
            );

    }, [userDetails])

    const foundUsers = []

    useEffect(() => {

        db.collection("users").doc(user).collection("vescovered").get()
    .then(snapshot => {

        snapshot.forEach((doc) => {
            foundUsers.push(doc.data())
        })
        setVescoveredUsers(foundUsers)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])

  const viewUser = (id) => {

    console.log(id)

          db.collection("users").doc(id).get()
        .then(doc => {
            if (doc.exists) {
               setUserDetails(doc.data())
               setIsOpen(!isOpen)

            }
        })
        .catch(error => {
            console.log(error)
        })


      }

      
       const togglePopup = () => {
        setIsOpen(!isOpen);
      }


    return (
        <>
        {
            vescoveredUsers.map(e => {
                return <VescoveredUser
                key={e.email}
                image={e.image}
                firstName={e.firstName}
                veganFor={e.veganSince}
                age={e.age}
                handleClick={viewUser}
                id={e.email}
                />
            })
        }

        {isOpen && <ViewUserPopUp
      content={<>
      <table className='view-user-table'>
                <thead>
                    <tr>
                        <th scope="row" colSpan={2}></th>
                 
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" colSpan={2}><img className="account--avatar" src={userDetails.imagePath}/><h3 id="acc-full-name"></h3> {userDetails.firstName !== undefined 
                    && userDetails.secondName !== undefined ? `${userDetails.firstName} ${userDetails.secondName}` : "" } </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}><h3>{userDetails.age !== undefined ? userDetails.age : ""}</h3></th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> <h3>{`Vegan For: ${userDetails.veganFor !== undefined ? userDetails.veganFor : ""}`}</h3> </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}></th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> <h3>{userDetails.gender}</h3> </th>
                    </tr>
                    <tr>
                    <th scope="row"colSpan={2}> 
                        <Tooltip title={`@${userDetails.instagram}`}>
                        <img src={AccInstaIcon} style={{
                            display: "inline-block",
                            margin: " 0 40px"
                            
                        }}/>

                        </Tooltip>

                        <Tooltip title={`@${userDetails.twitter}`}>
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
                    <th scope="row" colSpan={2}></th>
                    </tr>
                </tfoot>
                </table>
      </>}
      handleClose={togglePopup}
    />} 
        
        
        </>

        

    )
}