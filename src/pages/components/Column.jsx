import { useEffect, useState } from "react"
import Card from "./Card.jsx"
import Button from "./Button.jsx"

export default function Column(props) {
    const [cards, setCards] = useState(props.column.cards)
    const [tempText, setTempText] = useState(props.column.title)
    const [committedText, setCommittedText] = useState(props.column.title)
    const [nextId, setNextId] = useState(props.column.nextId)
    
    useEffect(() => {
        const newColumn = {
            ...props.column,
            text: committedText,
            cards: cards,
            nextId: nextId
        }
        props.saveColumn(newColumn)
    }, [cards, committedText, nextId])

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
        const card = {
            text: "",
            id: nextId,
            columnId: props.column.id,
            boardId: props.boardId
        }
        setCards([...cards, card])
        setNextId(prev => prev + 1)
    }

    // maybe split column and column contents? style vs content?
    return (<>
        <div className="w-[284px] max-h-[600px] overflow-y-auto px-1.5 mx-1.5 bg-zinc-200 rounded-[5px] flex-col justify-start items-center gap-2.5 inline-flex">
            <textarea 
                className="text-slate-600 font-bold font-['Roboto']"
                placeholder={"Title Here Bruh"}
                onChange={handleTitleChange}
                value={tempText}
                onBlur={handleTitleUpdate}
            />
            <Button onClick={props.onColumnDelete}>X</ Button>
            <div>
                <ul>
                    {cards.map(card => {
                        return (<li key={card.id}>
                            <Card
                                card={card}
                                columnId={props.column.id}
                                boardId={props.boardId}
                                saveCard={props.saveCard}
                            />
                        </li>)
                    })}
                </ul>
                <Button onClick={handleCardAdd}>Add Card</ Button>
            </div>
        </div>
    </>)
}

