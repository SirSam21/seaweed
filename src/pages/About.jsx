import { useContext, useEffect } from "react"
import { AppContext } from "../AppContext"

export default function About() {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setPageNavItems()
        ctx.setMenuTitle("About")
    }, [])

    return (<>
        <div className="info-page">
            <div className="info">
                <div className="info-title">
                    About
                </div>
                <div className="info-content">
                    Hi, I&apos;m Sam. This is my kanban website.
                    <br />
                    <br />
                    This website is the product of my giving frontend development a
                    shot. Before I began on this website, my expertise as an engineer
                    was as backend as backend gets; backend and cloud infrastructure
                    engineering. I decided to build this website to go outside my
                    comfortzone and round out my abilities regarding web development.
                    Hopefully you find the website useful, if not I&apos;m open to feedback.
                </div>
            </div>
        </div>
    </>)
}
