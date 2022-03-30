import React from "react"

export default function Recipe(props) {

    const {image, title, time, rating, handleClick, link} = props

    return (
        <div className="recipe-row-item"onClick={() => handleClick(link)}>
        <img src={image} />
        <div className="display-text" style={{
            paddingLeft : "5px",
            overflow : "hidden",
            whiteSpace : "normal"
        }}>
        <h3 style={{
            fontSize : "14px"
        }}>{title}</h3>
        <h5>{`Score: ${rating}`}</h5>
        <h4>{`Ready in ${time} minutes`}</h4>
        </div>
    </div>
    )
}