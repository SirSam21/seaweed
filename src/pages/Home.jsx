import { useEffect } from "react"

export default function Home(props) {
    const { setPageMenu } = props

    useEffect(() => {
        setPageMenu()
    })

    return (<>
        <h1 className="bg-emerald-400">Welcome to Seaweed!</h1>
    </>)
}
