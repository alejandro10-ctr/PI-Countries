import React from "react";
import {Link} from 'react-router-dom'
import './LandingPage.css'


export default function LandingPage(){
    
    return(
        <div className="LandingContainer">
        <h1 className="LandingTitle">Hello World</h1>

        <Link to ='/home'>
        <button className="LandingBtn" > Enter </button>
        </Link>
        </div>
    )
}