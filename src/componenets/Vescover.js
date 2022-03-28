import {auth , provider, db} from '../firebase.js';
import React, {useState, useEffect} from "react"
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';



export default function Vescover() {

    const [userList, setUserList] =  useState([])

    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 4
      };

     
        const users = []

        db.collection("users").get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
                setUserList(users)
        })
    })
        .catch(error => {
            console.log(error)
        })

        // const markers = users.map(e => {
        //     console.log(e)
        //     return <Marker
        //         key={e.email} 
        //         lat={e.latitude}
        //         lng={e.longitude}
        //         name={e.firstName}
        //         color="#3797A4"
            
        //     />
        // })



      const handleApiLoaded = (map, maps) => {
        
      };
      

   

    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCwE_g8rAeCVTtWv_n1wgOsiU3QHHjppHQ"}}
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
                
                />

                })
             

            }
           
        
       
        </GoogleMapReact>
      </div>
        
        
    )
}
