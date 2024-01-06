import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boards from "./pages/Boards.jsx";
import NavBar from "./pages/NavBar.jsx";
import { useEffect, useState } from "react";
import SeaweedRoot from "./SeaweedRoot.jsx";
import Donate from "./pages/Donate.jsx";
import About from "./pages/About.jsx";
import CardInfo from "./pages/components/CardInfo.jsx"

function App() {

  const [pageMenu, setPageMenu] = useState()

  useEffect(() => {
    document.title = "Seaweed Boards! :D"
  }, [])

  return (
    <>
      <SeaweedRoot>
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
      </SeaweedRoot>
    </>
  )
}

export default App
