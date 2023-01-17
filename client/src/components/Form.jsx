import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getActivity, postActivity } from "../redux/actions"; 
import { getCountries } from "../redux/actions";
import './Form.css'




function valid(input){
    let errors = {}
    const pattern = new RegExp("[a-zA-Z ]{2,254}");
    const maximo = 35
    
    if(!pattern.test(input.name)){
       errors.name = "Name must be written only with alphabetical characters"
    }
    if(input.name && input?.name?.length > maximo ){
        errors.name = "Name can not have more than 35 characters"
    }
    if(input.name && input?.name?.length === 0 ){
       errors.name = "Name is required"
     } 
    if(input.season && input?.season?.length === 0){
       errors.season = "Season is required"
     }
     if(input.difficulty && input?.difficulty?.length === 0){
       errors.difficulty = "Difficulty is required"
     }
    if(input.duration && input?.duration?.length === 0){
       errors.duration = "Duration is required"
     } 
     if(input.countryId && input?.countryId?.length === 0){
       errors.countryId = "Country is required"
     }
    return errors 
   }






export default function Form () {
    const dispatch = useDispatch();
  
    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [select, setSelect] = useState([])
     const countries = useSelector(state => state.countries)
     countries && countries?.sort((a, b) => {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    }) 

    const [input, setInput] = useState({
             name: "",
            difficulty: "",
            duration: "",
            season: "",
            countryId: "", 
    }) 

    useEffect(()=> {
       dispatch(getCountries())   
    },[dispatch])
/* 
    useEffect(()=> {
        dispatch(getActivity())   
     },[dispatch]) */
 




    function handleChange(e){
      //  console.log(e)
      /*   setInput((prevInput)=>{
            const newInput = {
            ...prevInput,
            [e.target.name] :  e.target.value 
       } 
       const validations = valid(newInput)
       setErrors(validations)
       return newInput */
           setInput({
            ...input,
            [e.target.name] :  e.target.value
        })
     setErrors(valid({
        ...input,
        [e.target.name]: e.target.value 

     }))
    // console.log(input)
    }

    function handleSelect(e){
        //console.log(e.target.name)
    setInput({
        ...input,
        [e.target.name] :  e.target.value
    })
    setErrors(valid({
    ...input,
    [e.target.name]: e.target.value 

   }))


    }
     function handleCountrySelect(e){
        e.preventDefault();
        
        setSelect([...select, e.target.value])
        
        //console.log(select)
        
        setInput({
            ...input,
            countryId: [...select, e.target.value]
        })
        

        //set.add(e.target.value)
        
        //console.log(set) 
        
        
        setErrors(valid({
            ...input,
            [e.target.name]: e.target.value 
            
        }))
        
    }

    var set = new Set()
    set.add((input.countryId))
    console.log(set)
    
    var mySet = new Set(Array.from(set))
   var arr = (Array.from(mySet))
   var set0 = new Set(arr[0])
   console.log(set0)

   const inputValue = Array.from(set0)

    
    function insertCountry(e){
        
            setInput(
                ({
                    ...select,
                    countryId: set0,
                    
                }))
            }

     function handleDelete(e){
        setInput({
             ...input, 
            countryId: inputValue.filter(item => item !== e),
            
            
        })
    } 

    

    

    function handleSubmit(e){
        e.preventDefault();

         if(Object.values(errors).length > 0){
            alert("Please complete the information required")
        }else if(
            input.name === '' ||
           // input.name !== /^[A-Z]+$/i ||
            input.season === '' ||
            input.difficulty === '' ||
            input.duration === '' ||
            input.countryId === '' 
         ){
            alert('Please complete the form correctly')
            history.push('/activities')
         }
        else {
        console.log(e)
        dispatch(postActivity(input))
        alert("New activity available")
    
        history.push('/home')
       }
    }

    function handleBack(e){
       e.preventDefault();
       history.push('/home')
    } 

    function refreshPage(){
        window.location.reload();
    }
    



    const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
    const difficulty = [1, 2, 3, 4, 5];
    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];



    return (
        <div className="FormContainer">
        <div className="Form">
            <h1 className="FormTitle">Create a new Activity</h1>
            <br>
            </br>
            <br>
            </br>
            <div>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <div>
                        <label>Activity name:  </label>
                        <br>
                        </br>
                        <input 
                        type="text" 
                         value={input.name}  
                          name="name"   
                        onChange={handleChange} 
                        /* placeholder="Activity..." */ 
                        />
                          {errors.name && (
                            <p className="errors" >{errors.name}</p>
                        )}   
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div>
                        <label>Season of the year:  </label>
                        <br>
                        </br>
                        <select value={input.season} name="season" onChange={handleSelect} >
                            <option  >Select a season</option> 
                        {season.map(item => (
                            <option key={item} value={item} name="season" >{item}</option>
                        ))}
                        </select>
                         {errors.season && (
                            <p className="errors">{errors.season}</p>
                        )}  
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div>
                        <label>Difficulty level:  </label>
                        <br>
                        </br>
                        <select value={input.difficulty} name="difficulty" onChange={handleSelect} >
                            <option value="">Choose a level</option>
                            {difficulty.map(item=> (
                                <option key={item} value={item} name="difficulty">{item}</option>
                            ))}
                        </select>
                         {errors.difficulty && (
                            <p className="errors" >{errors.difficulty}</p>
                        )}  
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div>
                        <label>Duration in hours:  </label>
                        <br>
                        </br>
                        <select value={input.duration} name="duration" onChange={handleSelect}>
                            <option  >Choose a time</option>
                            {duration.map(item=> (
                                <option key={item} value={item} name="duration">{item}</option>
                            ))}
                        </select>
                          {errors.duration && (
                            <p className="errors">{errors.duration}</p>
                        )}   
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <div>
                        <label >Country:  </label>
                        <br>
                        </br>
                        <select value={input.countryId} name="countryId" onChange={handleCountrySelect} >
                            <option className="SelectACountry" value="">Select a country</option>
                            {countries && countries?.map(item =>   (
                                <option onSelect={handleCountrySelect} value={item.id} name="countryId" key={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <textarea
                        className="inputCountry"
                        id="inputCountry"
                        value = {inputValue}
                        name = 'countriesInput'
                        key = {inputValue}
                        onChange={ insertCountry}
                        />
                           {errors.countryId && (
                            <p className="errors">{errors.countryId}</p>
                        )}    
                    </div>
                     <div className="deletelist">
                        <ul>
                            <li key={input.countryId} >
                                {inputValue && inputValue?.map(item =>  
                                    <div >
                                        {item}
                                        <button className="DeleteBtn" onClick={()=> handleDelete(item)} type="button" >X</button>
                                    </div>
                                    )}
                            </li>
                        </ul>
                    </div> 
                    <button className="SubmitBtn" /* onSubmit={handleSubmit} */ type="submit" >Add</button>
                    <br>
                    </br>
                    <br>
                    </br>
                    <button className="SubmitBtn" onClick={handleBack}>Back</button>
                    <br>
                    </br>
                    <br>
                   </br>
                   <br>
                   </br>
                    <div>
                <button className="FormRefresh" type="submit" onClick={refreshPage}>Refresh</button>
             </div>
                </form>
            </div>
        </div>
        </div>
    )
}