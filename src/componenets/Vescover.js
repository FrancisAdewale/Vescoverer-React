import {auth , provider, db} from '../firebase.js';
import React, {useState, useEffect} from "react"
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


export default function Vescover(props) {

    const [userList, setUserList] =  useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({})

    const lng = userDetails.longitude
    const lat = userDetails.latitude

    const user = auth.currentUser.email

    const defaultProps = {
        center: {
          lat: 48.864716,
          lng: 2.349014
        },
        zoom: 2
      };

     
        const users = []

        db.collection("users").get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                if(doc.id != user) {
                    users.push(doc.data())
                }
        })
        setUserList(users)

    })
        .catch(error => {
            console.log(error)
        })

      
      const handleApiLoaded = (map, maps) => {
        
      };

   
    const vescoverUser = (e, id) => {

        props.updateParent()

        var age = 0
        var firstName = ""
        var veganSince = ""
        var imagePath = ""
        

        db.collection("users").doc(id).get()
        .then(doc => {
            if (doc.exists) {

                console.log(doc.data().age)

                age = doc.data().age
                firstName = doc.data().firstName
                veganSince = doc.data().veganFor
                imagePath = doc.data().imagePath
            }
        })
        .then(() => {
            db.collection("users").doc(user).collection("vescovered").doc(id)
       .set({
            email : id,
            firstName : firstName,
            age: age,
            veganSince : veganSince,
            image: imagePath
        })
        .catch(error => {
            console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

  

   

    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_REACT_API, language: 'en',
          region: 'en',}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            {
                 userList.map(e => {

                    return <Marker
                    key={e.email} 
                    lat={e.latitude}
                    lng={e.longitude}
                    name={e.firstName}
                    color="#3797A4"
                    id={e.email}
                    handleClick={vescoverUser}
                
                />
                })
             
            }
        </GoogleMapReact>
       
      </div>
        
        
    )
}
