import React from "react"
import { useEffect, useState } from "react"
import {  useSelector, useDispatch } from 'react-redux'
import { getCountries, orderByAlphaAsc, orderByAlphaDesc, orderPopMax, orderPopMin/* , byId, byName */, continentFilter, activityFilter, getActivity } from "../redux/actions"
import { Link } from 'react-router-dom'
import Paginado from "./Paginado"
import Card from "./Card"
import SearchBar from "./SearchBar"
import "./Home.css"
//import axios from 'axios'


//let prevId = 1


export default function Home(){

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
   // const allActivities = useSelector((state) => state.activities)

    //console.log(allActivities)
    //console.log(allCountries)


    
    const [loading, setLoading] = useState(false)

    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLast = currentPage * countriesPerPage
    const indexOfFirst = indexOfLast - countriesPerPage
    const [currentCountries, setCurrentCountries] = useState([])
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        console.log(pageNumber)
        if(pageNumber === 1){
            setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast-1) )
        }else{
            setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast))
        }
    }

   
    
    
    useEffect(() => {
        setLoading(true)
        setTimeout(()=> {
            setLoading(false)
        }, 1000)
       dispatch(getCountries()) 
    },[dispatch])
    

    useEffect(() => {
        if(allCountries && currentPage===1){
            setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast-1))
        }else if(allCountries){
            setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast))
        }
    },[allCountries])

 
    const countriesWithActivities =  allCountries && allCountries?.filter(item => item.activities.length > 0) 
    console.log(countriesWithActivities)
    const fullActivities = ( countriesWithActivities && countriesWithActivities?.map(el => el.activities)) 
    console.log(fullActivities)
    const activityNames =(fullActivities && fullActivities?.map(el => el.map(item => item.name))) 
    console.log(activityNames)  
      
    
    



    



    /*
    const actividad = countriesWithActivities.activities.map(el => el.name)
    console.log(actividad) 
    
    
    
    console.log(allCountries && allCountries?.forEach(item => item.activities.map(el => el.name)).activities.map(el => el.name))
    */
          


    function handleContinents(e) {
        e.preventDefault();
        dispatch(continentFilter(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleAlphaSort(e){
        e.preventDefault();
        if(e.target.value === "Asc"){
        dispatch(orderByAlphaAsc(e.target.value))
       }else if(e.target.value === "Desc"){
        dispatch(orderByAlphaDesc(e.target.value))
        }
        setOrder(e.target.value)
       }

    function handleOrderPop(e){
        e.preventDefault();
        if(e.target.value === "Min"){
        dispatch(orderPopMax(e.target.value))
        }else if(e.target.value === "Max"){
        dispatch(orderPopMin(e.target.value))    
        }
        setOrder(e.target.value)
       /*  setCurrentPage(1)
        setOrder(e.target.value) */
    }

    function handleActivities(e){
        e.preventDefault();
        dispatch(activityFilter(e.target.value))
        setOrder(e.target.value)
    }

    useEffect(() => {
        dispatch(getActivity())
    }, [dispatch])


    function refreshPage(){
        window.location.reload();
    }
    
    
    
    
    /*   
  

    function handlePrevClick(e) {
        e.preventDefault()
        const Prev = () => {
            if(allCountries && currentPage !== 1){
                setCurrentPage(currentPage -1)
                setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast))
            } else if(allCountries && currentPage === 1){
                setCurrentPage(currentPage -1)
                setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast-1))
            }
        }
        Prev()
        
    }
    
    
    function handleNextClick(e){
        e.preventDefault()
        const Next = () => {
            
                setCurrentPage(currentPage + 1) 
                setCurrentCountries(allCountries?.slice(indexOfFirst, indexOfLast))
                
             
        }
        Next()
    }
    console.log(currentPage)
    console.log(countriesPerPage)
    
    
    */



    
if(loading){
    return(
        <div className="LoaderContainer">
        <div className="Loading">Loading...</div>
        <div className="spinner">
           {/*  <img src="Earth_animated.gif" alt="spinner" />  */} 
        </div>
        </div>
    )
} else

    return (
        <div className="HomeContainer" key="HomeContainer" >
            <h1 className="HomeTitle">Hello World</h1>

            <SearchBar
            setCurrentPage={setCurrentPage}
             />
            <br>
            </br>
            <br>
            </br>

            <Link to='/activities'>
                <button className="btnToForm">Activity Creator</button>
            </Link>
            <br>
            </br>
            <br>
            </br>
            
            <div>
                <button className="HomeRefresh" type="submit" onClick={refreshPage}>Refresh</button>
             </div>

<div className="OrdersFilters">

<div className="Filters">
    <h3 className="FilterTitle">Filter by: </h3>
  <div key="FilterAct">
            
                 <select key="ActFilter" name="FilterActivity"  onChange={handleActivities}>
                         <option value="All" key="All" defaultValue="All">All Activities</option>
                         {
                        /*     activityNames && activityNames?.forEach(el =>  el.map(     ///////////////ARREGLAR ESTA LOGICA!!!!!!!!!!!!!!
                                <option value={el} key={el}  >{el > 1 ? el.map(item => item) : el}</option>
                            )) */
                        } 

                           
                       
                    </select> 
               
</div>  


<div key="FilterCont">
           <select key="FiltCont" onChange={handleContinents} >
                    <option value='All' key='All'>All Continents</option>
                    <option value='Africa' key='Africa'>Africa</option>
                    <option value='Antarctica' key='Antarctica'>Antarctica</option>
                    <option value='Asia' key='Asia'>Asia</option>
                    <option value='Europe' key='Europe'>Europe</option>
                    <option value='North America' key='NorthAmerica'>North America</option>
                    <option value='Oceania' key='Oceania'>Oceania</option>
                    <option value='South America' key='SouthAmerica'>South America</option>
           </select>
</div>     
</div>

<div className="Orders">
<h3 className="OrderTitle">Order by: </h3>
<div key="SortAlpha">
            <select defaultValue='Alphabetical Order' name="alphabetical" key='AlphabSort' onChange={e => handleAlphaSort(e)}>
                <option key="SortAlphabet" value='Alphabetical Order' disabled>Alphabetical Order</option>
                <option key="Ascen" value='Asc'  >Ascendent</option>
                <option key="Descen" value='Desc' >Descendent</option>
            </select>
</div>
<div key='PopSort'>
            <select key='PopuSort' defaultValue='Population Order' name="population"  onChange={handleOrderPop}>
            <option key="SortPop" value='Population Order' disabled>Population Order</option>
                <option value='Max' key='Max'>Max population</option>
                <option value='Min' key='Min'>Min population</option>
            </select>
</div>
</div>
</div>

{/*         <div>
         <button  className="pageBtn" disabled={currentPage === 0} onClick={(e)=> handlePrevClick(e)} > {'<<'} </button>
         <button  className="pageBtn"  disabled={currentPage === 26} onClick={(e)=> handleNextClick(e)} > {'>>'} </button>

      </div>
 */}               
             

    {
    <Paginado 
    countriesPerPage={countriesPerPage}
    allCountries= {allCountries?.length}
    paginado= {pagination}
    />
    }
<div>
    {
        currentCountries && currentCountries.map(e => {
            return (
                
                    <Link key={e.id} to={`/countries/${e.id}`} >
                        <Card
                        id= {e.id}
                        flagImage = {e.flagImage} 
                        name = {e.name}
                        continent = {e.continent}
                        />
                    </Link>
                  
            )
        })
    }
</div>



        </div>
    )
}