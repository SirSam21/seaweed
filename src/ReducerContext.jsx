import { createContext } from "react";

const emptyBoard = {
    id: 0,
    columns: [],
    nextId: 0
}

const emptyColumn = {
    id: 0,
    title: "",
    boardId: 0,
    cards: [],
    nextId: 0
}

const emptyCard = {
    id: 0,
    text: "",
    boardId: 0,
    columnId: 0
}

export function Reducer(state, action) {
    switch (action.type) {
        case "reset":
            return initialState
        case "saveBoards": {
            return {
                ...state,
                boards: action.boards
            }
        }
        case "saveBoard": {
            const newBoards = saveBoard(action.board, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "addBoard": {
            const newBoard = {
                ...emptyBoard,
                id: action.id
            }

            setNextBoardId(prev => prev + 1)

            const newBoards = saveBoard(newBoard, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "saveColumn": {
            const newBoards = saveColumn(action.column, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "addColumn": {
            const newColumn = {
                ...emptyColumn,
                id: action.id,
                boardId: action.boardId
            }
            const newBoards = saveColumn(newColumn, state.boards)
            console.log(newBoards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "deleteColumn": {
            const columns = state.boards[action.boardId].columns
            const newColumns = columns.filter(c => c.id !== action.id)
            const newBoard = {
                ...state.boards[action.boardId],
                columns: newColumns
            }
            const newBoards = saveBoard(newBoard, state.boards)
            console.log(newBoards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "saveCard": {
            const newBoards = saveCard(action.card, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "addCard": {
            const newCard = {
                ...emptyCard,
                id: action.id,
                boardId: action.boardId,
                columnId: action.columnId
            }
            const newBoards = saveCard(newCard, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "deleteCard": {
            const cards = state.boards[action.boardId].columns[action.columnId].cards
            const newCards = cards.filter(c => c.id !== action.cardId)
            const newColumn = {
                ...state.boards[action.boardId].columns[action.columnId],
                cards: newCards
            }
            const newBoards = saveColumn(newColumn, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        default:
            return state
    }
}

export const initialState = {
    boards: [emptyBoard],
    nextId: 0
}

export const ReducerContext = createContext({
    state: {
        boards: [emptyBoard]
    },
    dispatch: () => { }
})


function saveBoard(board, boards) {
    let updated = false
    const newBoards = boards.map(b => {
        if (b.id === board.id) {
            updated = true
            return board
        }
        return b
    })

    if (!updated) {
        return [...boards, board]
    } else {
        return newBoards
    }
}

function saveColumn(column, boards) {
    let updated = false
    console.log(column)
    console.log(boards)
    const board = getBoard(column, boards)
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
        return saveBoard(newBoard, boards)
    } else {
        const newBoard = {
            ...board,
            columns: newColumns
        }
        return saveBoard(newBoard, boards)
    }
}

function saveCard(card, boards) {
    let updated = false
    const column = getColumn(card, boards)
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
        return saveColumn(newColumn, boards)
    } else {
        const newColumn = {
            ...column,
            cards: newCards
        }
        return saveColumn(newColumn, boards)
    }
}

function getBoard(item, boards) {
    return boards.find(b => b.id === item.boardId)
}

function getColumn(card, boards) {
    const columns = getBoard(card, boards).columns
    return columns.find(b => b.id === card.columnId)
}
