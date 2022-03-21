import React, {useState} from "react"
import {auth , provider, db} from '../firebase.js';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Age(props) {

const user = auth.currentUser.email

const [selectedDate, setSelectedDate] = useState(new Date());
const [age, setAge] = useState(0)

  const handleDateChange = (date) => {

    setSelectedDate(date)

  }
   
    const actualAge = calculateAge(new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getUTCDate()))
    // setAge(actualAge)

    const h3Eele = document.getElementById("actual-age")

    // h3Eele.textContent = age

    db.collection("users").doc(user).set({
        age : actualAge

        }, { merge: true })
  
  

  function calculateAge(date) 
  {
    const now = new Date();
    const diff = Math.abs(now - date );
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); 
    return age
  } 

        return (
            <div className="date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select your D.O.B"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                
            />
            </MuiPickersUtilsProvider>
            <h3 id="actual-age"></h3>
            <button className="age-done-btn" id="age" onClick={(e) => props.callback(e)}>Next</button>
            </div>
            

        )
     
          
}