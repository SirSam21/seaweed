import { useReducer } from "react"
import App from "./App.jsx"
import { AppProvider } from "./AppContext"
import { initialState, ReducerContext, Reducer as reducer } from "./ReducerContext.jsx"

export default function SeaweedRoot() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<>
        <ReducerContext.Provider value={{ state, dispatch }}>
            <AppProvider>
                <App />
            </AppProvider>
        </ReducerContext.Provider>
    </>)
}
