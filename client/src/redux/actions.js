import axios from 'axios';

export const ALL_COUNTRIES = 'ALL_COUNTRIES'
export const BY_NAME = 'BY_NAME'
export const BY_ID = 'BY_ID'
export const POST_ACT = 'POST_ACT'
export const CONT_FILTER = 'CONT_FILTER'
export const ALPHA_ORDER_ASC = 'ALPHA_ORDER_ASC'
export const ALPHA_ORDER_DESC = 'ALPHA_ORDER_DESC'
export const POP_ORDER_MAX = 'POP_ORDER_MAX' 
export const POP_ORDER_MIN = 'POP_ORDER_MIN'
export const FILT_ACT = 'FILT_ACT'
export const GET_ACTIVITY = 'GET_ACTIVITY'




export function getCountries(){
    return async function(dispatch){
        try{
            let info = await axios.get("http://localhost:3001/countries");
            return dispatch({
                type: ALL_COUNTRIES,
                payload: info.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function byName(name){
    return async function(dispatch){
        try{
            let info = await axios.get(`http://localhost:3001/countries/?name=${name}`);
            console.log(name)
            console.log(info)
            return dispatch({
                type: BY_NAME,
                payload: info.data 
            })
        }catch(error){
            console.log(error,  alert("That country does not exist"))
        }
    }
}     

export function byId(id){
    return async function(dispatch){
        try{
            let info = await axios.get(`http://localhost:3001/countries/${id}`);
            //console.log(info.data)
            return dispatch({
                type: BY_ID,
                payload: info.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function postActivity(input){
    return async function(dispatch){
        console.log(input)
        try{
          let post = await axios.post("http://localhost:3001/activities",
          input);
          return dispatch({
            type: POST_ACT,
            payload: post.data
          })
        }catch(error){
            console.log(error)
        }
    }
}

export function activityFilter(payload){
    console.log(payload)
    return async function(dispatch){
        try{
            
           const resp = await axios.get("http://localhost:3001/activity")
           console.log(resp)
           return dispatch({
               type: FILT_ACT,
               allActivities: resp.data,
               activities: resp.data,
               payload
            })
        }catch(error){
            console.log(error)
        }
    }
}


export function continentFilter(payload){
     return({
        type: CONT_FILTER,
        payload: payload,
     })
}



export function orderByAlphaAsc(payload){
    return ({
        type: ALPHA_ORDER_ASC,
        payload: payload
    })
}

export function orderByAlphaDesc(payload){
    return ({
        type: ALPHA_ORDER_DESC,
        payload: payload
    })
}

export function orderPopMax(payload){
    return ({
        type: POP_ORDER_MAX,
        countries: payload
    })
}
export function orderPopMin(payload){
    return ({
        type: POP_ORDER_MIN,
        countries: payload
    })
}

 export function getActivity(){
     return async function (dispatch){
         try{
             const allActs = await axios.get("http://localhost:3001/activity")
            // console.log(allActs.data)
        return dispatch ({
            type: GET_ACTIVITY,
            activities: allActs.data
        })
    }catch(error){
        console.log(error)
    }
}
} 