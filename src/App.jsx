import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boards from "./pages/Boards.jsx";
import NavBar from "./pages/NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import Donate from "./pages/Donate.jsx";
import About from "./pages/About.jsx";
import CardInfo from "./pages/components/CardInfo.jsx"
import { AppContext } from "./AppContext.jsx";

function App() {

    const [pageMenu, setPageMenu] = useState()
    const ctx = useContext(AppContext)

    useEffect(() => {
        document.title = "Seaweed Boards! :D"
    }, [])

    if (!ctx) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="overflow-hidden h-screen bg-zinc-800">
                <BrowserRouter basename="/seaweed">
                    <NavBar pageMenu={pageMenu} />
                    <Routes>
                        <Route path="/" element={<Home setPageMenu={setPageMenu} />}>
                        </Route>
                        <Route path="/boards" element={<Boards setPageMenu={setPageMenu} />}>
                            <Route path="card/:cardId" element={<CardInfo />}>
                            </Route>
                        </Route>
                        <Route path="/about" element={<About setPageMenu={setPageMenu} />}>
                        </Route>
                        <Route path="/donate" element={<Donate setPageMenu={setPageMenu} />}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
