import { useEffect } from "react"

export default function About(props) {
    const { setPageMenu } = props
    useEffect(() => setPageMenu(null), [])
    return <h1>TODO: it aint done</h1>
}
