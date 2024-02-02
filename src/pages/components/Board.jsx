import { useContext, useEffect, useState } from "react"
import Column from "./Column"
import { Outlet } from "react-router-dom"
import { AppContext } from "../../AppContext"
import BoardsMenuItems from "./BoardsMenuItems"
import { ReducerContext } from "../../ReducerContext"

export default function Board(props) {
    const ctx = useContext(AppContext)
    const reducer = useContext(ReducerContext)
    const board = getThisBoard()
    const [nextId, setNextId] = useState(board.nextId)

    useEffect(() => {
        const board = getThisBoard()
        setNextId(board.nextId)
    },[reducer.state])

    useEffect(() => {
        ctx.setPageNavItems(
            <BoardsMenuItems
                boardId={props.id}
                onColumnAdd={onColumnAdd}
            />
        )
    }, [nextId, reducer.state])

    function onColumnAdd() {
        const action = {
            type: "addColumn",
            boardId: props.id,
            id: nextId
        }
        reducer.dispatch(action)
        setNextId(prev => prev + 1)
    }

    function getThisBoard() {
        return reducer.state.boards.find(b => b.id === props.id)
    }

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
