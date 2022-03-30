import React from "react"

export default function ViewUserPopUp(props) {

    return (
        <div className="view-user-popup-box">
        <div className="view-user-box" >
            <span className="view-user-close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>

    )
}