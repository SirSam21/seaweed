import { useContext, useEffect } from "react"
import { AppContext } from "../AppContext"

export default function Home() {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setPageNavItems()
        ctx.setMenuTitle("Home")
    }, [])

    return (<>
        <h1>Welcome to Seaweed!</h1>
    </>)
}
