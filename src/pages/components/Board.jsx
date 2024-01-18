import { useContext, useEffect, useState } from "react"
import Column from "./Column"
import { Outlet } from "react-router-dom"
import { AppContext } from "../../AppContext"
import BoardsMenuItems from "./BoardsMenuItems"

export default function Board(props) {
    const [columns, setColumns] = useState(props.board.columns)
    const [nextId, setNextId] = useState(props.board.nextId)

    const ctx = useContext(AppContext)


    const pageNavMenu = <BoardsMenuItems
                            onColumnAdd={handleAddColumn}
                            onResetClick={props.resetData}
                        />

    ctx.setPageNavItems(pageNavMenu)

    useEffect(() => {
        const newBoard = {
            ...props.board,
            columns: columns,
            nextId: nextId
        }
        props.saveBoard(newBoard)
    }, [columns, nextId])

    function handleAddColumn() {
        const column = {
            title: "",
            cards: [],
            id: nextId,
            nextId: 0,
            boardId: props.board.id
        }
        setColumns([...columns, column])
        setNextId(prev => prev + 1)
    }
    
    function handleColumnDelete(column) {
        setColumns(columns.filter(c => c.id !== column.id))
    }

    return (<>
        {/* <BoardSettings></BoardSettings> */}
        {/*
        <div>
            <h1>Innards of a Board</h1>
            <Button onClick={handleAddColumn}>+ Column</Button>
            <Button onClick={props.resetData}>Reset Data</Button>
        </div>
        */}
        <div>
            <ul>
                {columns.map(column => {
                        return <li key={column.id}>
                        <Column
                            column={column}
                            onColumnDelete={() => handleColumnDelete(column)}
                            boardId={props.board.id}
                            saveColumn={props.saveColumn}
                            saveCard={props.saveCard}
                        />
                    </li>
                })}
            </ul>
            <Outlet />
        </div>
    </>)
}
