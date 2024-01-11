import { useEffect, useState } from "react"
import Board from "./components/Board"
import { testData } from "../testdata"

export default function Boards() {
    const [boards, setBoards] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const localBoards = JSON.parse(localStorage.getItem("seaweedBoards"))

        console.log("localBoards: ", localBoards)
        if (localBoards) {
            setBoards(localBoards)
        } else {
            setBoards([...boards, testData])
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded) {
            console.log("boards: ", boards)
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
                columns: [...newColumns, column]
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
                cards: [...newCards, card]
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
        <div className="overflow-hidden">
            <Board
                board={boards[0]}
                saveBoard={saveBoard}
                saveColumn={saveColumn}
                saveCard={saveCard}
            />
        </div>
    </>)
}
