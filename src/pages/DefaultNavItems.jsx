import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function DefaultNavItems() {

    const location = useLocation()

    return (<>
        <div className="nav-link">
            <NavLink to="/" className={location.pathname === "" ? "menu-btn active" : "menu-btn"}>
                <img src="home.svg" alt="home" />
            </NavLink>
        </div>
        <div className="nav-link">
            <NavLink to="/boards" className={location.pathname === "boards" ? "menu-btn active" : "menu-btn"}>
                <img src="boards.svg" alt="boards" />
            </NavLink>
        </div>
        <div className="nav-link">
            <NavLink to="/about" className={location.pathname === "about" ? "menu-btn active" : "menu-btn"} >
                <img src="info.svg" alt="info" />
            </NavLink>
        </div>
    </>)
}

