import React from "react"
import VeganFor from "./componenets/VeganFor"
import "./Register.css"

export default function Register() {

    const names = ["Vegan For", "Name", "Age", "Gender", "Upload Image", "Socials"]
    return (
        <div className='register-outer'>
        <nav>{names[0]}</nav>

        <div className='register-middle'>
            <div className='register-inner'>
                 <VeganFor/>
            </div>
        </div>
    </div>
        
    )
}