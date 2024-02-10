import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boards from "./pages/Boards.jsx";
import NavBar from "./pages/NavBar.jsx";
import Menu from "./pages/components/Menu"
import { useContext, useEffect } from "react";
import About from "./pages/About.jsx";
import CardInfo from "./pages/components/CardInfo.jsx"
import { AppContext } from "./AppContext.jsx";
import DefaultNavItems from "./pages/DefaultNavItems.jsx";

export default function App() {

    useEffect(() => {
        document.title = "Seaweed Boards! :D"
    }, [])

    const ctx = useContext(AppContext)

    return (
        <>
            <BrowserRouter>
                <NavBar>
                    <Menu menuTitle={ctx.menuTitle}>
                        {ctx.pageNavItems}
                    </Menu>
                    <div className="divider" />
                    <DefaultNavItems />
                </NavBar>
                <div id="page-container" className="page-container">
                    <Routes>
                        <Route path="/" element={<Home />}>
                        </Route>
                        <Route path="/boards" element={<Boards />}>
                            <Route path="card/:cardId" element={<CardInfo />}>
                            </Route>
                        </Route>
                        <Route path="/about" element={<About />}>
                        </Route>
                    </Routes>
                </ div>
            </BrowserRouter>
        </>
    )
}


