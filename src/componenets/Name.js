import React, {useState} from "react"
import {auth , provider, db} from '../firebase.js';


export default function Name() {






    return (
        <form className="form--fullname">
            <input type="text" placeholder="First Name"/>
            <input type="text" placeholder="Second Name"/>
        </form>
    )
}