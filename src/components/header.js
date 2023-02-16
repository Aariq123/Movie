import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../reducer/context";

const Header = () => {
    const [ category, setSubCategory ] = useState('')
    const { openSidebar, closeSidebar, hoverMenuOpen, hoverMenuClose, hoverMenu, hover, sideBar } = useContext(Context)
    const widthRef = useRef(null)
    const leftRef2 = useRef(null)
    const menuRef = useRef(null)
    const [ displayWidth, setDisplayWidth] = useState('')

   

    useEffect(()=>{
        setDisplayWidth(widthRef.current.clientWidth)
        console.log(widthRef.current.clientWidth)
    },[widthRef.current])
    

    const positioning = (e) => {
        if(displayWidth > 728){
            menuRef.current.style.left = e.target.offsetLeft+ 'px' 
            hoverMenuOpen(e.target.classList[0])
            setSubCategory(e.target.classList[0])
        }else{ 
            menuRef.current.style.left = e.target.offsetWidth+ 'px'
            menuRef.current.style.top = e.target.offsetTop + 67 + 'px'
            hoverMenuOpen(e.target.classList[0])
            setSubCategory(e.target.classList[0])
        }
    }



    return ( 
        <div className="header" ref={widthRef}>
            <i className={sideBar ? "fa-solid fa-bars" : "fa-solid fa-bars show"} onClick={openSidebar}></i>
            <i className={sideBar ? "fa-solid fa-xmark show" : "fa-solid fa-xmark"} onClick={closeSidebar}></i>
            <Link to='/' className="home-bt" >
            <div>
                <h2>NIGGA.com</h2>
            </div>
            </Link>
            <div className={sideBar ? "main-menus show" : "main-menus"}>
                <div onMouseOver={positioning} className="movie menu">MOVIES</div>
                <div onMouseOver={positioning} className="tv menu">TV SHOWS</div>
                <div className="people"><Link to='/headerPeople'>PEOPLE</Link></div>
            </div>
            <div ref={menuRef} className={hoverMenu ? 'hovermenu open menu' : 'hovermenu menu'}>{
              hover &&  hover.map((item, i)=>{
                    return (
                        <Link to='/hoverMenuPage' state={{subCategory:item, category:category}} className="menu" key={i}>{item}</Link>
                    )
                })
            }</div>
        </div>
    );
}
 
export default Header;
