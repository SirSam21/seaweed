import { useEffect } from "react"

export default function Donate(props) {
    const { setPageMenu } = props
    useEffect(() => setPageMenu(null), [])
    return <h1> I don't want your money I just wanted to add another page</h1>
}
