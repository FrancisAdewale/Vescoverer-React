import React, { useState } from "react"
import {auth , provider, db} from '../firebase.js';

 
export default function VeganFor(props) {

    const user = auth.currentUser.email

    const handleChange = (e) => {


        const h3Eele = document.getElementById("timeframe")

        const {value} = e.target

        h3Eele.textContent = value

        db.collection("users").doc(user).set({
                    veganFor : value
        }, { merge: true })
    }

    return (
        
        <form>
 
        <div className="select-box">
          
          <label for="select-box1" className="label select-box1"><span className="label-desc">Choose Your Timeframe</span> </label>
          <select id="select-box1" className="select" onChange={handleChange}>
            <option value="<20 Years" > Less than 20 Years</option>
            <option value="<10 Years"> Less than 10 Years</option>
            <option value="<5 Years" selected={true}> Less than 5 Years</option>
            <option value="<2 Years"> Less than 2 Years</option>
            <option value="<6 Months">Less than 6 Months</option>
          </select>

          <h3 id="timeframe"></h3>

          <button id="vegan" className="vegan-done-btn" onClick={(e) => props.callback(e)}>Next</button>
          
        </div>
         
      </form>  
    )
}