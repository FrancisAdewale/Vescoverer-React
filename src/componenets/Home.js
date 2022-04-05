import React ,{useState} from "react";
import logo from "../imgs/vescoverer.png"
import { Link } from "react-router-dom";

export default function Home(props) {
    return (
        <div style={{marginTop : "20px"}}>
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
            {
                props.isVegan ? <Link to="/login" className="home-done-nav-btn">Done</Link> 
                : <button className="home-done-btn" onClick={props.callback}>Done</button>
            }
            
        </div>
    );
}