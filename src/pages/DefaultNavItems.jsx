import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { faHome, faTableColumns, faUser } from "@fortawesome/free-solid-svg-icons"

export default function DefaultNavItems() {

    return (<>
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
    </>)
}

