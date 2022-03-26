import React from "react"
import {auth , provider, db} from '../firebase.js';

export default function Gender(props) {

    const user = auth.currentUser.email

    const handleChange = (e) => {


        const h3Eele = document.getElementById("user-gender")

        const {value} = e.target

        h3Eele.textContent = value

        db.collection("users").doc(user).set({
                    gender : value
        }, { merge: true })
    }

    return (
        <form>
 
        <div className="select-box">
          
          <label for="select-box1" className="label select-box1"><span className="label-desc">Choose Your Gender</span> </label>
          <select id="select-box1" className="select" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female" selected={true}>Female</option>
          </select>

          <h3 id="user-gender"></h3>

          <button id="gender" className="gender-done-btn" onClick={(e) => props.callback(e)}>Next</button>
          
        </div>
         
      </form>  
    )


}

