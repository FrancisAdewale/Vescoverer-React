import React from "react";
import logo from "../imgs/vescoverer.png"

export default function Home() {
    return (
        <div>
            <img className="home-logo" src={logo} alt="logo"/>
            <h3 className="home-question">Are You Vegan?</h3>
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <button className="home-done-btn">Done</button>
        </div>

    );
}