import { useReducer, useState } from "react"
import App from "./App.jsx"
import { AppProvider } from "./AppContext"
import { initialState, ReducerContext, Reducer as reducer } from "./ReducerContext.jsx"

export default function SeaweedRoot() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    function onMouseMove(e) {
        setX(e.clientX)
        setY(e.clientY)
    }

    return (<>
        <ReducerContext.Provider value={{ state, dispatch }}>
            <AppProvider>
                <App />
            </AppProvider>
        </ReducerContext.Provider>
    </>)
}
