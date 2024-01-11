import { useEffect, useState } from "react"
import Column from "./Column"
import Button from "./Button"
import { Outlet } from "react-router-dom"

export default function Board(props) {
    const [columns, setColumns] = useState(props.board.columns)
    const [nextId, setNextId] = useState(props.board.nextId)

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
        <div className="flex flex-c justify-items-start gap-10 px-10 w-full bg-gray-300">
            <h1>Innards of a Board</h1>
            <Button onClick={handleAddColumn}>+ Column</Button>
        </div>
        <div className="overflow-y-hidden">
            <div className="columns-3 flex bg-zinc-800 p-1.5">
                <ul className="whitespace-nowrap">
                    {columns.map(column => {
                        return <li key={column.id} className="inline-block">
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
            </div>
            <Outlet />
        </div>
    </>)
}
