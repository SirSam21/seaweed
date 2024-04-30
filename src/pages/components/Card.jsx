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
    const textbox = useRef(null)
    const cardRef = useRef(null)
    const [tempText, setTempText] = useState(card.text)
    const [committedText, setCommittedText] = useState(card.text)
    const [cardMid, setCardMid] = useState()

    useEffect(() => {
        const { top, bottom } = cardRef.current.getBoundingClientRect()
        setCardMid((top - bottom / 2) + bottom)
    }, [])

    useEffect(() => {
        const action = {
            type: "saveCard",
            card: {
                ...card,
                text: committedText,
                mid: cardMid,
            }
        }
        reducer.dispatch(action)
    }, [committedText, cardMid])

    function handleTextChange(e) {
        setTempText(e.target.value)

        textbox.current.style.height = "0px"
        textbox.current.style.height = `${textbox.current.scrollHeight}px`

        updateMid()
    }

    function updateMid() {
        const { top, bottom } = cardRef.current.getBoundingClientRect()

        setCardMid((top - bottom / 2) + bottom)
    }

    function handleTextReset(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
            textbox.current.style.height = "0px"
            textbox.current.style.height = `${textbox.current.scrollHeight}px`
            updateMid()
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

    function onDragStart(e) {
        if (e.target.classList.contains('card')) {
            e.target.classList.add("card-is-dragging");
        }
    }

    function onDragEnd(e) {
        e.preventDefault()

        const draggingElement = document.querySelector(".card-is-dragging")

        if (draggingElement === null) {
            return
        }

        const board = reducer.state.boards.find(b => b.id === props.boardId)

        let draggingCard = null
        board.columns.forEach((col) => {
            col.cards.forEach((card) => {
                if (card.id == draggingElement.id) {
                    draggingCard = {
                        ...card,
                        mid: e.clientY
                    }
                    return
                }
            })
            if (draggingCard !== null) {
                return
            }
        })

        const action = {
            type: "moveCard",
            card: draggingCard,
            x: e.clientX,
        }
        reducer.dispatch(action)
        e.target.classList.remove("card-is-dragging");
    }

    return (<>
        <div
            className="card"
            draggable="true"
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            id={props.id}
            ref={cardRef}
        >
            <textarea
                ref={textbox}
                onChange={handleTextChange}
                value={tempText}
                placeholder={"Add a description :)"}
                onKeyUp={handleTextReset}
                onBlur={() => setCommittedText(tempText)}
            />
            <Button className="card-button" onClick={handleCardDelete}>
                <div className="black-rectangle" />
            </ Button>
        </div>
    </>)
}


