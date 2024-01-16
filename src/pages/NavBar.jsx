import { NavLink } from "react-router-dom"

export default function NavBar() {

    return (<>
        <nav className="side-bar">
            <div className="nav-link">
                <NavLink to="/">
                    Home
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/boards">
                    Boards
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/about">
                    About
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/donate">
                    Donate
                </NavLink>
            </div>
        </nav>
    </>)
}

// <div className="nav-link" class="w-[1920px] h-[49px] bg-sky-700"></div>
// <div className="nav-link" class="w-[41px] h-[41px] bg-blue-500 rounded"></div>
