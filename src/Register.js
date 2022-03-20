import React, { useState }  from "react"
import VeganFor from "./componenets/VeganFor"
import Name from "./componenets/Name"
import Age from "./componenets/Age"
import "./Register.css"
import {auth , provider, db} from './firebase.js';

export default function Register() {



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

        if(id === "veganForCompleted") {
            setSectionCount(sectionCount => sectionCount + 1)

            let temp_state = [...sections]

            let temp_element = { ...temp_state[0] }
    
            temp_element.veganForCompleted = !temp_state[0].veganForCompleted

            temp_state[0] = temp_element

            setSections(temp_state)
        }
        
        if(id === "name") {

            console.log(id)

            setSectionCount(sectionCount => sectionCount + 1)
            let temp_state = [...sections]

            let temp_element = { ...temp_state[1] }
    
            temp_element.nameCompleted = !temp_state[1].nameCompleted

            temp_state[1] = temp_element
            setSections(temp_state)
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
        
      case ( sections[0].veganForCompleted && sections[1].nameCompleted):
        return <Age />

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