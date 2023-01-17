import {ALL_COUNTRIES, BY_NAME, BY_ID, POST_ACT, CONT_FILTER, ALPHA_ORDER_ASC, ALPHA_ORDER_DESC, POP_ORDER_MAX, POP_ORDER_MIN, FILT_ACT, GET_ACTIVITY} from './actions'

const initialState ={
    countries : [],
    allCountries : [],
    activities: [],
    allActivities: [],
    detail: [],
    population : [] 
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                population: action.payload,
               
            }

        case BY_NAME:
            return {
                ...state,
                countries: action.payload
            }   

        case BY_ID:
            return {
                ...state,
                detail: action.payload
            } 
 
        case POST_ACT:
            console.log(action.payload)
            return {
                ...state,
                allActivities: action.payload
            }
        
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }    

        case CONT_FILTER:    
            let paises = state.allCountries  
           console.log(paises)
           console.log(action.payload)
           
           return{
               ...state,
               countries: action.payload === 'All' ? paises : paises.filter((item) => item.continent === action.payload) //paises.map(el => names.includes(el.name))
            }
            
            
            
        case ALPHA_ORDER_ASC:
            let countries = state.countries;
           
            return{
                ...state,
                countries: countries.slice().sort((a , b) =>{
                    if(a.name < b.name) return -1
                    if(b.name < a.name) return 1 
                    return 0
                }) 
            }
        case ALPHA_ORDER_DESC:
            let countriess = state.countries;
            return {
                ...state,
                countries: countriess.slice().sort((a , b) =>{
                    if(a.name < b.name) return -1
                    if(b.name < a.name) return 1 
                    return 0
                }).reverse()
            }    



   
            case POP_ORDER_MAX:
                let countris = [...state.countries]
                return {
                ...state,
                countries:countris.slice().sort((a, b) =>{
   
                    return a.population - b.population
                })
                
            }

            case POP_ORDER_MIN:
                let countriss = state.countries
                return {
                    ...state,
                    countries: countriss.slice().sort((a, b) =>{
   
                        return a.population - b.population
                    }).reverse()
                }

            case FILT_ACT:
                const countr = state.allCountries
               // console.log(state.activities)
                const countriesWithActivities = countr.filter(item => item.activities.length > 0)
               // console.log(countriesWithActivities)
                const countryWithActivity = countriesWithActivities.filter(el => el.activities.find(item=> item.name.includes(action.payload)))
                
                //console.log(countryWithActivity)
                //console.log(action.payload) 
                return {
                    ...state,
                    countries: action.payload === 'All' ? countriesWithActivities : countryWithActivity
                }
                 
            default:  
            return state       
        }
    }