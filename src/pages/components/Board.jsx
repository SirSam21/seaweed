import { useContext, useEffect, useState } from "react"
import Column from "./Column"
import { Outlet } from "react-router-dom"
import { AppContext } from "../../AppContext"
import BoardsMenuItems from "./BoardsMenuItems"
import { ReducerContext } from "../../ReducerContext"

export default function Board(props) {
    const ctx = useContext(AppContext)
    const reducer = useContext(ReducerContext)

    const nextColId = reducer.state.boards[props.id].nextId
    const [nextId, setNextId] = useState(nextColId)

    function onColumnAdd() {
        const action = {
            type: "addColumn",
            boardId: props.id,
            id: nextId
        }
        reducer.dispatch(action)
        setNextId(prev => prev + 1)
    }

    const pageNavMenu = <BoardsMenuItems
        boardId={props.id}
        onColumnAdd={onColumnAdd}
    />

    useEffect(() => ctx.setPageNavItems(pageNavMenu), [nextId])

    return (<>
        {reducer.state.boards[props.id].columns.map(column => {
            return <Column
                key={column.id}
                boardId={props.id}
                className="column"
                id={column.id}
            />
        })}
        <Outlet />
    </>)
}
