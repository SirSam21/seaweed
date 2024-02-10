import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Button from "./Button"

export default function Menu(props) {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const body = document.body
        if (menuOpen) {
            body.addEventListener("click", CloseOverlay, { once: true })
        }
    }, [menuOpen])

    function CloseOverlay() {
        setMenuOpen(false)
    }

    function handleMenuOpen(e) {
        e.stopPropagation()
        setMenuOpen(true)
    }

    return (<>
        <Button className="menu-btn" onClick={handleMenuOpen}>
            <img src="menu_arrow.svg" alt="Menu" />
        </Button>
        {menuOpen && createPortal(
            <>
            <div className="menu-open">
                <div className="container">
                    {props.children}
                </div>
                <div className="menu-title">
                    {props.menuTitle}
                </div>
            </div>
            </>,
            document.getElementById("page-container"))}
    </>)
}
