import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { byId } from "../redux/actions";
import { Link } from 'react-router-dom'
import Form from "./Form";
import './Detalle.css'
//import { get } from 'lodash'
//import { useParams } from "react-router-dom";


export default function Detail(id){
    //const {id} = useParams()
    const alpha3Code = (id.match.url !== "/activities") ? 
    id.location.pathname.slice(id.location.pathname.length - 3)
    : id.location.pathname.slice(id.location.pathname.length - 10)
      //  console.log(id)
     //  console.log(id.location.pathname.slice(id.location.pathname.length - 3))
     //  console.log(alpha3Code) 
    const dispatch = useDispatch()
    
    const details = useSelector((state)=> state.countries)
  //  const detail = useSelector((state)=> state.detail)
  
   // console.log(details)
   // console.log(detail)
    
  
var coma = ", "
   
const filteredCountry = details && details?.filter(item => item.id === alpha3Code) ?
details?.filter(item => item.id === alpha3Code) :
console.log("se rompieron los estados otra vez, MALDITO USESELECTOR!!!!");

console.log(filteredCountry)

const normalizcionNumero = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    return number.toString().replace(exp,rep);
}
  

     useEffect(()=> {
        dispatch(byId(alpha3Code))  
    },[alpha3Code, dispatch]) 

    if(alpha3Code !== 'activities')
    return(
        <div className="DetalleContainer">
            {
                filteredCountry && filteredCountry[0].flagImage ?
                <img src={filteredCountry[0].flagImage} alt='' />
                :
                 console.log("Image not found")
            }
            <div className="DetailContainer">
            {
                filteredCountry && filteredCountry[0].name ?
                <h1 key="name" >{filteredCountry[0].name}</h1>
                : 
                console.log("Name not found")
            }
            {
                filteredCountry && filteredCountry[0].continent ?
                <h2 key="continent" >placed in the continent of {filteredCountry[0].continent}</h2>
                :
                console.log("Continent not found") 
            }
            {
                filteredCountry && filteredCountry[0].subregion ?
                <h3 key="subregion" >in the region of {filteredCountry[0].subregion}</h3>
                :
                console.log("Subregion not found")
            }
            {
                filteredCountry && filteredCountry[0].capital ?
                <h3 key="capital" >capital in {filteredCountry[0].capital}</h3>
                :
                console.log("Capital not found") 
            }
            
            {
                filteredCountry && filteredCountry[0].area ?
                <h4 key="area" >with an area of {normalizcionNumero(filteredCountry[0].area)} km2</h4>
                :
                console.log("Area not found") 
            }
            {
                filteredCountry && filteredCountry[0].population ?
                <h4 key="population" >and {normalizcionNumero(filteredCountry[0].population)} habitants</h4>
                :
                console.log("Habitants not found")
            }
            {
                filteredCountry && filteredCountry[0].id ?
                <h5 key="id" >Id: {filteredCountry[0].id}</h5>
                :
                console.log("Id not found")
            }
            <hr className="hrDetail" ></hr>
            {
                filteredCountry && filteredCountry.map(el => el.activities.length > 1 ?
               ( 
               <div>
               <h2 key={el.name} >Activities:</h2>  { 
                 el.activities.map(item => <h4><li> {item.name} </li></h4> )
                  
                }
               
                </div>)
                :
                console.log("Activities not found")
                )
            }
            
          {/*   <hr className="hrDetail"></hr> */}
            <br></br>
            <Link to='/home'>
            <button className="DetailBackBtn" to='/home' >Back</button>
            </Link>
            </div>
        </div>
    )
   else{
    return(
        <div>
           <Form/> 
        </div>
    )
   }

}


