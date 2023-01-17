import React/* , { useEffect } */ from "react";
import { useState } from "react";
import { useDispatch/* , useSelector */ } from 'react-redux'
import { byName } from "../redux/actions";
import './SearchBar.css'


export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const [search, setSearch] = useState(false)
    //const allCountries = useSelector((state)=> state.countries)

   // console.log(allCountries)





   

    function handleInputChange(e){
        e.preventDefault();
        setInput(e.target.value)
        console.log(e.target.value)

    }


    async function handleClick(e){
       e.preventDefault();
       setCurrentPage(1) 
       
     /*   const match = allCountries.map(item => item.name.includes(input));

       if(!match){
        return alert("There's no information of that country")
       } */

       if(input){
       dispatch(byName(input))
       setInput("")
       setSearch(true) 
       document.getElementById("input").value="";
       }else{
        setSearch(true)
        return alert("Choose a country")
       }

       



     
     /*   const countryNames = allCountries.filter(el => el.name)
       if(!countryNames.includes(input)){
        alert("No match for that name")
       } */




    } 

    return(
        <div>
            <input
            className="inputSearchCountry"
            name = "busqueda"
            type = "text"
            placeholder="Search a country..."
            onChange={(e) => handleInputChange(e)}
            autoComplete= "off"
            id="input"
            />
            <br>
            </br>
            <div>
            <button className="SearchBtn" onClick={(e) => handleClick(e)} type="submit" >Search</button>
            </div> 
        </div>
    )
}