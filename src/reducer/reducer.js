import { movies, tv } from '../data'


const reducer = (state, action) => {
    if (action.type == 'Hover-Menu-Open') {
        if (action.payload == 'movie') {
            return { ...state, hoverMenu: true, hover: movies }
        } else if (action.payload == 'tv') {
            return { ...state, hoverMenu: true, hover: tv }
        }
    }
    if (action.type == 'Hover-Menu-Close') {
        return { ...state, hoverMenu: false }
    } 
    if (action.type == 'Sidebar-Open') {
        return { ...state, sideBar:true }
    }
    if (action.type == 'Sidebar-Close') {
        return { ...state, sideBar:false }
    }
}

export default reducer
