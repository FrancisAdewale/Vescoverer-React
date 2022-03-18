import React, { useState }  from "react"
import VeganFor from "./componenets/VeganFor"
import Name from "./componenets/Name"
import "./Register.css"
import {auth , provider, db} from './firebase.js';

export default function Register() {



    const [sections, setSections] = useState({
        veganForCompleted : false,
        nameCompleted: false,
        ageCompleted : false,
        genderCompleted : false,
        uploadCompleted : false,
        socialsCompleted : false
    })

    const [sectionCount, setSectionCount] = useState(0)

    const changeRegState = (e) => {
        const { id } = e.target

    
        if(id === "veganForCompleted") {
            setSectionCount(sectionCount => sectionCount + 1)
            setSections(prevState => {

                return {...prevState, veganForCompleted: !sections.veganForCompleted}
            })
        } 
        
        if(id === "name") {

            console.log(id)

            // setSectionCount(sectionCount => sectionCount + 1)
            // setSections(prevState => {

            //     return {...prevState, nameCompleted: !sections.nameCompleted}
            // })


        }

    }

    // const renderComponent = () => {
    //     if(sections.veganForCompleted) {
    //         return 
    //     }
    // }




    const names = ["Vegan For", "Name", "Age", "Gender", "Upload Image", "Socials"]
    return (
        <div className='register-outer'>
        <nav className="nav--register-title">{names[sectionCount]}</nav>

        <div className='register-middle'>
            <div className='register-inner'>
                {

                sections.veganForCompleted 
                
                ?

                <Name
                callback={changeRegState}
                />

                : 

                 <VeganFor 
                 isCompleted={sections.veganForCompleted}
                 callback={changeRegState}
                 />
                }

                
            </div>
        </div>
    </div>
        
    )
}