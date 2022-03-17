import React from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



export default function VeganFor() {

    const options = [
        '<20 Years', '<10 Years', '<5 Years', '<2 Years', '<6 Months'
      ];
      const defaultOption = options[0];

      const onSelect = () => {
          console.log("change")

      }

    return (
        
          <Dropdown 
          options={options} 
          onChange={onSelect} 
          value={defaultOption}
          placeholder="Select an option" />
    )
}