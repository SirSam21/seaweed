import { useContext, useEffect } from "react"
import { AppContext } from "../AppContext"

export default function Home() {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setPageNavItems()
        ctx.setMenuTitle("Home")
    }, [])

    return (<>
        <div className="info-page">
            <div className="home-page">
                <div className="info">
                    <div className="info-title">
                        Home
                    </div>
                    <div className="info-content">
                        Welcome to Seaweed boards!
                    </div>
                </div>
            </div>
            <img src="ocean_floor_no_bg.png" alt="background" />
        </div>
    </>)
}
