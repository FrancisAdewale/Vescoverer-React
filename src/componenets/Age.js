import React, {useState} from "react"
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function Age() {

const [selectedDate, setSelectedDate] = useState(new Date());
const [age, setAge] = useState(0)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()
  const day = selectedDate.getDay()

  const actualAge = calculate_age(month,day, year)


  function calculate_age(month,day,year)
{
    let today_date = new Date()
    let today_year = today_date.getFullYear()
    let today_month = today_date.getMonth()
    let today_day = today_date.getDate()
    let age = today_year - year

    if ( today_month < (month - 1))
    {
        age--
    }
    if (((month - 1) == today_month) && (today_day < day))
    {
        age--
    }

    console.log(age)
    return age
}

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
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
        )
     
          
}