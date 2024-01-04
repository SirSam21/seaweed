import { NavLink } from "react-router-dom"

export default function NavBar() {
  return (<>
    <nav className="bg-black text-emerald-500 border-blue-500">
      <div className="flex max-w-screen-l">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/boards">Boards</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/donate">Donate</NavLink></li>
        </ul>
      </div>
    </nav>
  </>)
}