import { useState } from "react"
import { createPortal } from "react-dom"
import Button from "./Button"

export default function Menu(props) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (<>
        <Button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <img src="menu_arrow.svg" alt="Menu" />
        </Button>
        {menuOpen && createPortal(
            <>
            <div className="overlay" onClick={() => setMenuOpen(false)} />
            <div className="menu-open">
                <div className="container">
                    {props.children}
                </div>
                <div className="menu-title">
                    {props.menuTitle}
                </div>
            </div>
            </>,
            document.body)}
    </>)
}
