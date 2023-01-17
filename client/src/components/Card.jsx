import React from "react";
import './Card.css'





export default function Card({flagImage, name, continent, id}){

//const allcountries = useSelector((state) => state.countries)



    return (

        <div className="cardContainer">
            <div className="card">
                <div>
                    <img className="cardImage" src={flagImage} alt=''/>
                </div>
                <h2 className="cardTitle" >{name}</h2>
                <h3 className="cardName" > {continent} </h3>
            </div>
        </div>



       
    )
}