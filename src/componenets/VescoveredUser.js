import React from "react"

export default function VescoveredUser(props) {

    const {image, firstName, veganFor, age, handleClick, id} = props

      
    
    return (
        <div className="vescovered-row-item" onClick={() => handleClick(id)}>
            <img src={image} />
            <div className="display-text">
            <h3>{firstName}</h3>
            <h5>{age}</h5>
            <h4>{`Vegan for: ${veganFor}`}</h4>
            </div>
            
        </div>

    )
}