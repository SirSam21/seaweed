import { useContext, useEffect } from "react"
import { AppContext } from "../AppContext"

export default function Home() {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setPageNavItems()
    }, [])

    return (<>
        <h1>Welcome to Seaweed!</h1>
    </>)
}
