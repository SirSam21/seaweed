import { useState } from "react"
import Card from "./Card.jsx"
import Button from "./Button.jsx"

export default function Column(props) {
    const [cards, setCards] = useState([])
    const [nextCardId, setNextCardId] = useState(0)
    const { colId, onColumnDelete } = props

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
        <div>
            <Button onClick={onColumnDelete}>X</ Button>
            <div>
            <Button onClick={handleCardAdd}>Add Card</ Button>
            <ul>
                {cards.map((card) => {
                    return (<li id={card.id}>
                        <Card
                        onCardDelete={() => handleCardDelete(card.id)} />
                    </li>)
                })}
            </ul>
            </div>
        </div>
    </>)
}
