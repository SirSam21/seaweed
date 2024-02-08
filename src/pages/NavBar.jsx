import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

export default function NavBar(props) {

    return (<>
        <nav className="side-bar">
            {props.children}
        </nav>
    </>)
}
