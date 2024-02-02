import { useContext, useEffect, useState } from "react"
import Card from "./Card.jsx"
import Button from "./Button.jsx"
import { ReducerContext } from "../../ReducerContext.jsx"

export default function Column(props) {

    const reducer = useContext(ReducerContext)
    const column = getThisColumn()
    const [tempText, setTempText] = useState(column.title)
    const [committedText, setCommittedText] = useState(column.title)
    const [nextId, setNextId] = useState(column.nextId)

    useEffect(() => {
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
    
    function getThisColumn() {
        const board = reducer.state.boards.find(b => b.id === props.boardId)
        const column = board.columns.find(c => c.id === props.id)
        return column
    }

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

    return (<>
        <div>
            <div className="column">
                <div className="column-header">
                    <input
                        placeholder={"Title Here Bruh"}
                        onChange={handleTitleChange}
                        value={tempText}
                        onBlur={handleTitleUpdate}
                        className="column-title"
                    />
                    <div className="button-container">
                        <Button className="column-button" onClick={handleCardAdd}>
                            <img src="+.svg" alt="add column" className="add-button" />
                        </ Button>
                        <Button className="column-button" onClick={handleColumnDelete}>
                            <img src="x.svg" alt="add column" className="add-button" />
                        </ Button>
                    </div>
                </div>
                <div className="cards-container">
                    {column.cards.map(card => {
                        return (<Card
                            key={card.id}
                            columnId={props.id}
                            boardId={props.boardId}
                            id={card.id}
                        />)
                    })}
                </div>
            </div>
        </div>
    </>)
}

