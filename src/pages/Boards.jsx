import { useEffect, useState } from "react"
import Board from "./components/Board"
import { testData } from "../testdata"

export default function Boards() {
    const [boards, setBoards] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const localBoards = JSON.parse(localStorage.getItem("seaweedBoards"))

        if (localBoards) {
            setBoards(localBoards)
        } else {
            setBoards([...boards, testData])
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded) {
            localStorage.setItem("seaweedBoards", JSON.stringify(boards))
        }
    }, [boards, loaded])

    function saveBoard(board) {
        let updated = false
        const newBoards = boards.map(b => {
            if (b.id === board.id) {
                updated = true
                return board
            }
            return b
        })
        if (!updated) {
            setBoards([...boards, board])
        } else {
            setBoards(newBoards)
        }
    }

    function saveColumn(column) {
        let updated = false
        const board = getBoard(column)
        const columns = board.columns
        const newColumns = columns.map(c => {
            if (c.id === column.id) {
                updated = true
                return column
            }
            return c
        })

        if (!updated) {
            const newBoard = {
                ...board,
                columns: [...newColumns, column],
                nextId: column.id + 1
            }
            saveBoard(newBoard)
        } else {
            const newBoard = {
                ...board,
                columns: newColumns
            }
            saveBoard(newBoard)
        }
    }

    function saveCard(card) {
        let updated = false
        const column = getColumn(card)
        const cards = column.cards
        const newCards = cards.map(c => {
            if (c.id === card.id) {
                updated = true
                return card
            }
            return c
        })

        if (!updated) {
            const newColumn = {
                ...column,
                cards: [...newCards, card],
                nextId: card.id + 1
            }
            saveColumn(newColumn)
        } else {
            const newColumn = {
                ...column,
                cards: newCards
            }
            saveColumn(newColumn)
        }
    }

    function resetData() {
        setBoards([testData])
    }

    // item can be a column or a card
    function getBoard(item) {
        return boards.find(b => b.id === item.boardId)
    }

    function getColumn(card) {
        const columns = getBoard(card).columns
        return columns.find(b => b.id === card.columnId)
    }

    if (!loaded) {
        return "Loading..."
    }

    // need some kinda board id thing here if we are gonna have
    // multiple boards
    return (<>
        <div className="board-container">
            <Board
                board={boards[0]}
                saveBoard={saveBoard}
                saveColumn={saveColumn}
                saveCard={saveCard}
                resetData={resetData}
            />
        </div>
    </>)
}
