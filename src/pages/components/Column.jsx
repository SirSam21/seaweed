import { useContext, useEffect, useState } from "react"
import Card from "./Card.jsx"
import Button from "./Button.jsx"
import { ReducerContext } from "../../ReducerContext.jsx"

export default function Column(props) {

    const reducer = useContext(ReducerContext)
    const column = reducer.state.boards[props.boardId].columns[props.id]

    const [tempText, setTempText] = useState(column.title)
    const [committedText, setCommittedText] = useState(column.title)
    const [nextId, setNextId] = useState(column.nextId)

    useEffect(() => {
        const column = reducer.state.boards[props.boardId].columns[props.id]

        if (column === null) {
            return
        }
        const newColumn = {
            ...column,
            title: committedText,
            nextId: nextId
        }

        const action = {
            type: "saveColumn",
            column: newColumn
        }
        reducer.dispatch(action)
    }, [committedText, nextId])

    function handleTitleChange(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
        } else {
            setTempText(e.target.value)
        }
    }

    function handleTitleUpdate() {
        setCommittedText(tempText)
    }

    function handleCardAdd() {
        const action = {
            type: "addCard",
            id: nextId,
            boardId: props.boardId,
            columnId: props.id
        }
        reducer.dispatch(action)
        setNextId(prev => prev + 1)
    }

    function handleColumnDelete() {
        const action = {
            type: "deleteColumn",
            id: props.id,
            boardId: props.boardId
        }
        reducer.dispatch(action)
    }

    // maybe split column and column contents? style vs content?
    return (<>
        <div>
            <textarea
                placeholder={"Title Here Bruh"}
                onChange={handleTitleChange}
                value={tempText}
                onBlur={handleTitleUpdate}
            />
            <Button onClick={handleColumnDelete}>X</ Button>
            <div className="cards-container">
                {reducer.state.boards[props.boardId].columns[props.id].cards.map(card => {
                    return (<Card
                        key={card.id}
                        columnId={props.id}
                        boardId={props.boardId}
                        id={card.id}
                    />)
                })}
                <Button onClick={handleCardAdd}>Add Card</ Button>
            </div>
        </div>
    </>)
}

