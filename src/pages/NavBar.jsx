import { NavLink } from "react-router-dom"

export default function NavBar(props) {
    const { pageMenu } = props

    return (<>
        <nav className="bg-black text-emerald-500 border-blue-500">
            <div className="max-w-screen-l">
                <div className="flex flex-col">
                    <ul className="flex justify-between px-10">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/boards">Boards</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/donate">Donate</NavLink></li>
                    </ul>
                    {pageMenu || <></>}
                </div>
            </div>
        </nav>
    </>)
}
