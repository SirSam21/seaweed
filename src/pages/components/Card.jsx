import { useEffect, useState, useContext, useRef } from "react"
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
    const textbox = useRef(null)

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
        textbox.current.style.height = "0px"
        textbox.current.style.height = `${textbox.current.scrollHeight}px`
    }

    function handleTextReset(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
            e.target.blur()
        } else if (e.key === "Enter") {
            setCommittedText(tempText)
            e.target.blur()
        }
        textbox.current.style.height = "0px"
        textbox.current.style.height = `${textbox.current.scrollHeight}px`
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
            <textarea
                ref={textbox}
                onChange={handleTextChange}
                value={tempText}
                placeholder={"Add a description :)"}
                onKeyUp={handleTextReset}
            />
            <Button className="card-button" onClick={handleCardDelete}>
                <div className="black-rectangle" />
            </ Button>
        </div>
    </>)
}


