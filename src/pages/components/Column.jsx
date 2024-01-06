import { useState } from "react"
import Card from "./Card.jsx"
import Button from "./Button.jsx"

export default function Column(props) {
    const [cards, setCards] = useState([])
    const [nextCardId, setNextCardId] = useState(0)
    const [title, setTitle] = useState("Card Title")
    const { colId, onColumnDelete } = props

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleCardAdd() {
        const card = {
            id: `${colId}-card-${nextCardId}`
        }
        setCards([...cards, card])
        setNextCardId(prev => prev + 1)
    }

    function handleCardDelete(id) {
       setCards(cards.filter((card) => {
           return card.id !== id
       }))
    }

    return (<>
        <div className="w-[284px] h-[362px] px-1.5 mx-1.5 bg-zinc-200 rounded-[5px] flex-col justify-start items-center gap-2.5 inline-flex">
            <input type="text" className="text-slate-600 font-bold font-['Roboto']" onChange={handleTitleChange} value={title} />
            <Button onClick={onColumnDelete}>X</ Button>
            <div>
            <ul>
                {cards.map((card) => {
                    return (<li key={card.id}>
                        <Card
                        // onCardDelete={() => handleCardDelete(card.id)}
                        cardId={card.id}
                        />
                    </li>)
                })}
            </ul>
            <Button onClick={handleCardAdd}>Add Card</ Button>
            </div>
        </div>
    </>)
}

