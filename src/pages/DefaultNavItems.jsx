import { NavLink } from "react-router-dom"

export default function DefaultNavItems() {

    return (<>
        <div className="nav-link">
            <NavLink to="/" className="menu-btn">
                <img src="home.svg" alt="home" />
            </NavLink>
        </div>
        <div className="nav-link">
            <NavLink to="/boards" className="menu-btn" >
                <img src="boards.svg" alt="boards" />
            </NavLink>
        </div>
        <div className="nav-link">
            <NavLink to="/about" className="menu-btn" >
                <img src="info.svg" alt="info" />
            </NavLink>
        </div>
    </>)
}

