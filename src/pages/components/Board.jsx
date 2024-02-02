import { useContext, useEffect, useState } from "react"
import Column from "./Column"
import { Outlet } from "react-router-dom"
import { AppContext } from "../../AppContext"
import BoardsMenuItems from "./BoardsMenuItems"
import { ReducerContext } from "../../ReducerContext"

export default function Board(props) {
    const ctx = useContext(AppContext)
    const reducer = useContext(ReducerContext)

    function getThisBoard() {
        return reducer.state.boards.find(b => b.id === props.id)
    }

    const board = getThisBoard()

    useEffect(() => console.log(board.nextId),[board.nextId])

    const [nextId, setNextId] = useState(board.nextId)

    function onColumnAdd() {
        const action = {
            type: "addColumn",
            boardId: props.id,
            id: nextId
        }
        reducer.dispatch(action)
        setNextId(prev => prev + 1)
    }

    useEffect(() => {
        ctx.setPageNavItems(
            <BoardsMenuItems
                boardId={props.id}
                onColumnAdd={onColumnAdd}
            />
        )
    }, [nextId])

    return (<>
        {board.columns.map(column => {
            return <Column
                key={column.id}
                boardId={props.id}
                id={column.id}
            />
        })}
        <Outlet />
    </>)
}
