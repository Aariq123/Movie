import { useReducer } from "react";
import { createContext } from "react";
import reducer from "./reducer";

const Context = createContext()



const initialState = {
   id : 'afbb2cb328f036d2e4c48ce3facfcad1', 
   hoverMenu : false,
   sideBar:false,
   hover:''
}
 

const ContextProvider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const hoverMenuOpen = (value) => {
       dispatch({type:'Hover-Menu-Open', payload:value})
    }

    const openSidebar = () => {
        dispatch({type:'Sidebar-Open'})
     }

    const closeSidebar = (e) => {
        if(state.sideBar == true){
            if(!e.target.classList.contains('menu')){
                dispatch({type:'Sidebar-Close'})
               
            }
        }
    }


    const hoverMenuClose = (e) => {
        if(state.hoverMenu == true){
            if(!e.target.classList.contains('menu')){
                dispatch({type:'Hover-Menu-Close'})
               
            }
        }
    }

    return ( 
        <Context.Provider value={{...state, closeSidebar, openSidebar, hoverMenuOpen, hoverMenuClose}}>
            {props.children}
        </Context.Provider>
    );
}

export { Context, ContextProvider };