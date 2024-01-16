import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boards from "./pages/Boards.jsx";
import NavBar from "./pages/NavBar.jsx";
import { useEffect } from "react";
import Donate from "./pages/Donate.jsx";
import About from "./pages/About.jsx";
import CardInfo from "./pages/components/CardInfo.jsx"

function App() {

    useEffect(() => {
        document.title = "Seaweed Boards! :D"
    }, [])

    return (
        <>
            <BrowserRouter basename="/seaweed">
                <NavBar />
                <div className="page-container">
                    <Routes>
                        <Route path="/" element={<Home />}>
                        </Route>
                        <Route path="/boards" element={<Boards />}>
                            <Route path="card/:cardId" element={<CardInfo />}>
                            </Route>
                        </Route>
                        <Route path="/about" element={<About />}>
                        </Route>
                        <Route path="/donate" element={<Donate />}>
                        </Route>
                    </Routes>
                </ div>
            </BrowserRouter>
        </>
    )
}

export default App
