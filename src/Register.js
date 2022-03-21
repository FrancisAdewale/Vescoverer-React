import React, { useState }  from "react"
import VeganFor from "./componenets/VeganFor"
import Name from "./componenets/Name"
import Age from "./componenets/Age"
import Gender from "./componenets/Gender"
import Upload from "./componenets/Upload"
import Socials from "./componenets/Socials"
import "./Register.css"
import {auth , provider, db} from './firebase.js';

export default function Register() {

    const user = auth.currentUser.email



    //make array of objects
    const [sections, setSections] = useState(
        [
            {id : 0, veganForCompleted : false},
            {id : 1, nameCompleted: false},
            {id : 2, ageCompleted : false},
            {id : 3, genderCompleted : false},
            {id : 4, uploadCompleted : false},
            {id : 5, socialsCompleted : false}
    ]
    )

    console.log(sections)

    const [sectionCount, setSectionCount] = useState(0)

    const changeRegState = (e) => {

        e.preventDefault();
        const { id } = e.target

        console.log(id)

        if(id === "vegan") {
            setSectionCount(sectionCount => sectionCount + 1)

            let temp_state = [...sections]

            let temp_element = { ...temp_state[0] }
    
            temp_element.veganForCompleted = !temp_state[0].veganForCompleted

            temp_state[0] = temp_element

            setSections(temp_state)
        }
        
        if(id === "name") {


            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[1] }
    
            temp_element.nameCompleted = !temp_state[1].nameCompleted

            temp_state[1] = temp_element
            setSections(temp_state)
        }

        if(id === "age") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[2] }
    
            temp_element.ageCompleted = !temp_state[2].ageCompleted

            temp_state[2] = temp_element
            setSections(temp_state)
        }

        if(id === "gender") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[3] }
    
            temp_element.genderCompleted = !temp_state[3].genderCompleted

            temp_state[3] = temp_element
            setSections(temp_state)
        }

        if(id === "upload") {

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[4] }
    
            temp_element.uploadCompleted = !temp_state[4].uploadCompleted

            temp_state[4] = temp_element
            setSections(temp_state)
        }

        if(id === "Socials") {

            let temp_state = [...sections]

            let temp_element = { ...temp_state[5] }
    
            temp_element.socialsCompleted = !temp_state[5].socialsCompleted

            temp_state[5] = temp_element
            setSections(temp_state)

            db.collection("users").doc(user).set({
                completedRegistration : true
            }, { merge: true })
        }

    }

    const names = ["Vegan For", "Name", "Age", "Gender", "Upload Image", "Socials"]
    return (
        <div className='register-outer'>
        <nav className="nav--register-title">{names[sectionCount]}</nav>

        <div className='register-middle'>
            <div className='register-inner'>
    {
    (function() {

    switch (true) {
      case (sections[0].veganForCompleted && sections[1].nameCompleted === false):

        return <Name
        callback={changeRegState}
        />
        
      case (sections[2].ageCompleted === false && sections[1].nameCompleted):
        return <Age
        callback={changeRegState}
        />

    case (sections[1].nameCompleted && sections[2].ageCompleted && sections[0].veganForCompleted && sections[3].genderCompleted === false):
        return <Gender
        callback={changeRegState}
        />

        case (sections[4].uploadCompleted === false && sections[3].genderCompleted):
        return <Upload
        callback={changeRegState}
        />

        case (sections[5].socialsCompleted === false && sections[4].uploadCompleted):
        return <Socials
        callback={changeRegState}
        />

      default:
        return <VeganFor 
        isCompleted={sections.veganForCompleted}
        callback={changeRegState}
        />
    }
 
    })()
    } 
                


                
            </div>
        </div>
    </div>
        
    )
}