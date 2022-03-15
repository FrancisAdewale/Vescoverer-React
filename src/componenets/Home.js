import React from "react";
import logo from "../imgs/vescoverer.png"


export default function Home(props) {
    
    return (
        <div>
            <img className={props.shake ? "shake" : "home-logo" } src={logo} alt="logo"/>
            <h3 className="home-question">Are You Vegan?</h3>
            <label className="switch">
                <input 
                type="checkbox"
                checked={props.isVegan}
                onChange={(e) => props.handleChange(e)}
                />
                <span className="slider round"></span>
            </label>
            <button className="home-done-btn" onClick={props.callback}>Done</button>
        </div>

    );
}