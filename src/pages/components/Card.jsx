import { useEffect, useState, useContext } from "react"
import { ReducerContext } from "../../ReducerContext"
import Button from "./Button"

export default function Card(props) {

    function getThisCard() {
        const board = reducer.state.boards.find(b => b.id === props.boardId)
        const column = board.columns.find(c => c.id === props.columnId)
        const card = column.cards.find(c => c.id === props.id)
        return card
    }

    const reducer = useContext(ReducerContext)
    const card = getThisCard()
    const [tempText, setTempText] = useState(card.text)
    const [committedText, setCommittedText] = useState(card.text)


    useEffect(() => {
        const action = {
            type: "saveCard",
            card: {
                ...card,
                text: committedText
            }
        }
        reducer.dispatch(action)
    }, [committedText])

    function handleTextChange(e) {
        setTempText(e.target.value)
    }

    function handleTextReset(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
            e.target.blur()
        } else if (e.key === "Enter") {
            setCommittedText(tempText)
            e.target.blur()
        }
    }

    function handleCardDelete() {
        const action = {
            type: "deleteCard",
            id: props.id,
            columnId: props.columnId,
            boardId: props.boardId
        }
        reducer.dispatch(action)
    }

    return (<>
        <div className="card">
            <input
                onChange={handleTextChange}
                value={tempText}
                placeholder={"Type here bruh"}
                onKeyUp={handleTextReset}
                className="text"
            />
            <Button className="card-button" onClick={handleCardDelete}>
                <div className="black-rectangle" />
            </ Button>
        </div>
    </>)
}


