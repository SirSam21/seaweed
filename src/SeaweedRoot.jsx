import App from "./App.jsx"
import { AppProvider } from "./AppContext"

export default function SeaweedRoot() {
    return (<>
        <AppProvider>
            <App />
        </AppProvider>
    </>)
}
