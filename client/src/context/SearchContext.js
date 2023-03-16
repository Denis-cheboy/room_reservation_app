import { createContext, useReducer } from "react"

const INITIAL_STATE={
    destination:undefined,
    dates:[],
    options:{
        adult:undefined,
        room:undefined,
        children:undefined,
    }
}

export const SearchContext=createContext()

const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload
        case  "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider=({children})=>{
    const [state,dispatch]=useReducer(SearchReducer,INITIAL_STATE)
    return (
        <SearchContext.Provider value={{city:state.destination,dates:state.dates,options:state.options,dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}