import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { faHandHoldingDollar, faHome, faTableColumns, faUser } from "@fortawesome/free-solid-svg-icons"

export default function NavBar() {

    return (<>
        <nav className="side-bar">
            <div className="nav-link">
                <NavLink to="/">
                    <FontAwesomeIcon className="icon" icon={faHome} size="2x" />
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/boards">
                    <FontAwesomeIcon className="icon" icon={faTableColumns} size="2x" />
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/about">
                    <FontAwesomeIcon className="icon" icon={faUser} size="2x" />
                </NavLink>
            </div>
            <div className="nav-link">
                <NavLink to="/donate">
                    <FontAwesomeIcon className="icon" icon={faHandHoldingDollar} size="2x" />
                </NavLink>
            </div>
        </nav>
    </>)
}

// <div className="nav-link" class="w-[1920px] h-[49px] bg-sky-700"></div>
// <div className="nav-link" class="w-[41px] h-[41px] bg-blue-500 rounded"></div>
