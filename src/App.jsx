import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Boards from "./pages/Boards.jsx";
import NavBar from "./pages/NavBar.jsx";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    document.title = "Seaweed Boards! :D"
  }, [])

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}>
          </Route>
          <Route path="/boards" element={<Boards></Boards>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
