import { createContext, useState } from "react";

export const AppContext = createContext()

export function AppProvider(props) {
    const [boards, setBoards] = useState([])
    const [nextBoardId, setNextBoardId] = useState(0)
    const [loaded, setLoaded] = useState(true)


    // useEffect(() => {
    //     console.log("board: ", boards[0])
    //     console.log("columns: ", columns)
    //     console.log("cards: ", cards)
    // }, [boards, columns, cards])

    function DeleteBoard(board) {
        setBoards(boards.filter(b => b !== board))
    }

    function getBoard(boardId) {
        return boards.find((b) => b.boardId === boardId)
    }

    const value = {
    //     boards,
    //     AddBoard,
    //     DeleteBoard,
    //     getBoard,
    //     loaded
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
