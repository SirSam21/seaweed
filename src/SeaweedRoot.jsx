import { AppProvider } from "./AppContext"
import App from "./App"

export default function SeaweedRoot() {
    return (<>
        <AppProvider>
            <App />
        </ AppProvider>
    </>)
}
