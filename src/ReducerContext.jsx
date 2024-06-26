import { createContext } from "react";
import { testData } from "./testdata";

const emptyColumn = {
    id: 0,
    title: "",
    boardId: 0,
    cards: [],
    nextId: 0
}

const emptyBoard = {
    id: 0,
    columns: [],
    nextId: 1
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
            return {
                ...state,
                boards: [testData]
            }
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
            return {
                ...state,
                boards: newBoards
            }
        }
        case "moveColumn": {
            /*
                action {
                    column
                    x
                }
            */
            const board = getBoard(action.column, state.boards)
            const newColumns = [...board.columns]

            newColumns.sort((a, b) => a.left - b.left)

            const newBoard = {
                ...board,
                columns: newColumns
            }
            const newBoards = saveBoard(newBoard, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "deleteColumn": {
            const board = getBoard({ boardId: action.boardId }, state.boards)
            const columns = board.columns
            const newColumns = columns.filter(c => c.id !== action.id)
            const newBoard = {
                ...board,
                columns: newColumns
            }
            const newBoards = saveBoard(newBoard, state.boards)
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
            const id = Math.floor(Math.random() * 65535)
            const newCard = {
                ...emptyCard,
                id: id,
                boardId: action.boardId,
                columnId: action.columnId
            }
            const newBoards = saveCard(newCard, state.boards)
            return {
                ...state,
                boards: newBoards
            }
        }
        case "moveCard": {
            /*
                action {
                    card
                    x
                }
            */
            const board = getBoard(action.card, state.boards)
            const initCol = getColumn(action.card, state.boards)

            // get the column that the card should now be a part of
            let toCol = board.columns.find((col) => {
                if (action.x > col.left && action.x < col.right) {
                    return col
                }
            })

            if (toCol === undefined || toCol === null) {
                toCol = initCol
            }

            const newCard = {
                ...action.card,
                columnId: toCol.id,
            }

            if (initCol.id != toCol.id) {
                // remove card from initial column
                const newInitCards = initCol.cards.filter(ca => ca.id !== action.card.id)
                const newInitCol = {
                    ...initCol,
                    cards: newInitCards
                }
                const tempBoards = saveColumn(newInitCol, state.boards)
                const newBoards = saveCard(newCard, tempBoards)

                return {
                    ...state,
                    boards: newBoards
                }
            } else {
                // card is being moved in the same column

                // sort cards by mid bound where mid bound for the moving card
                // is initially set to the clientY
                const newBoards = saveCard(action.card, state.boards)
                return {
                    ...state,
                    boards: newBoards
                }
            }
        }
        case "deleteCard": {
            const column = getColumn({ columnId: action.columnId, boardId: action.boardId }, state.boards)
            const cards = column.cards
            const newCards = cards.filter(c => c.id !== action.id)
            const newColumn = {
                ...column,
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
        const newSortedCards = [...newCards, card].sort((a, b) => a.mid - b.mid)
        const newColumn = {
            ...column,
            cards: newSortedCards,
            nextId: card.id + 1
        }
        return saveColumn(newColumn, boards)
    } else {
        const newColumn = {
            ...column,
            cards: newCards.sort((a, b) => a.mid - b.mid)
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

function getCard(cardId, boardId, boards) {
    const board = getBoard({ boardId: boardId }, boards)
    const columns = board.columns
    let foundCard = null
    columns.forEach((col) => {
        if (foundCard) {
            return
        }
        col.cards.forEach((card) => {
            if (!foundCard && card.id == cardId) {
                foundCard = card
            }
        })
    })
    return foundCard
}
