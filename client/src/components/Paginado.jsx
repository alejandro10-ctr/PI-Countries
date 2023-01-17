import React  from "react";
import './Paginado.css'


export default function Paginado({countriesPerPage, allCountries, paginado}){
    
    const pageNumber = [];


    for(let i = 1; i <= Math.ceil(allCountries/countriesPerPage) ; i++){
        pageNumber.push(i)
    }


    return (
        <div>
            <nav className="pagination">
                <ul className="pages">
                    {
                        pageNumber && pageNumber.map(number => (
                            <li key = {number}>
                                <button className="PageBtn" onClick={ ()=> paginado(number)} > {number} </button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}