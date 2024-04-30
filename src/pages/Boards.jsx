import { useContext } from "react"
import Board from "./components/Board"
import { ReducerContext } from "../ReducerContext"

export default function Boards() {
    const reducer = useContext(ReducerContext)

    function onDragOver(e) {
        e.preventDefault()

        const draggingElement = document.querySelector(".column-is-dragging")

        if (draggingElement === null) {
            return
        }

        let draggingCol = null
        reducer.state.boards[0].columns.forEach((col) => {
            if (col.id == draggingElement.id) {
                draggingCol = col
                draggingCol.left = e.clientX
                return
            }
        })

        const action = {
            type: "moveColumn",
            column: draggingCol,
        }

        reducer.dispatch(action)
    }

    return (<>
        <div
            className="board-container"
            onDragOver={onDragOver}
        >
            <Board
                board={reducer.state.boards[0]}
                id={0}
            />
        </div>
    </>)
}
