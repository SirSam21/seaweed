import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext()

function AppProvider(props) {
    const [pageNavItems, setPageNavItems] = useState()
    const [menuTitle, setMenuTitle] = useState("")

    const value = {
        pageNavItems,
        setPageNavItems,
        menuTitle,
        setMenuTitle
    }

    return (<>
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    </>)
}

export { AppContext, AppProvider }
