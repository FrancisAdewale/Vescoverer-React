import { Margin, PropaneSharp } from "@mui/icons-material"
import React, {useEffect, useState} from "react"
import AccInstaIcon from "../imgs/account-instagram.png"
import AccTwitterIcon from "../imgs/account-twitter.png"
import Geocode from "react-geocode";




export default function Account(props) {

    const [address, setAddress] = useState("")
    const lng = props.lng
    const lat = props.lat

    Geocode.setApiKey("AIzaSyA3RqIQZzvJfUWxsicl_YAalCTqI0zgp7I");

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

    



    return (
            <table>
                <thead>
                    <tr>
                    <th scope="row" colSpan={2}>Edit</th>
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
                        <img src={AccInstaIcon} style={{
                            display: "inline-block",
                            margin: " 0 40px"
                            
                        }} />
                        <img src={AccTwitterIcon} style={{
                            display: "inline-block",
                            margin: " 0 40px"

                        }}/> 

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
            </table>
    )
}