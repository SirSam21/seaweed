import { useState } from "react"
import Button from "./Button"

export default function Menu(props) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (<>
        <Button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <img src="menu_arrow.svg" alt="Menu" />
            <div className={ menuOpen ? "menu-open" : "menu-closed"}>
                {props.children}
            </div>
        </Button>
    </>)
}
