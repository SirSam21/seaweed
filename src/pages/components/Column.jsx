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


/*
<div class="">
    <div class="text-slate-600 text-3xl font-bold font-['Roboto']">Ideas</div>
    <div class="h-[109px] px-4 py-2.5 bg-white rounded shadow flex-col justify-start items-start gap-2.5 flex">
        <div class="justify-start items-start gap-1 inline-flex">
            <div class="w-[63px] h-[11px] bg-yellow-400 rounded-[14px]"></div>
            <div class="w-[63px] h-[11px] bg-red-500 rounded-[14px]"></div>
        </div>
        <div class="w-[216px] text-stone-900 text-base font-normal font-['Roboto'] leading-normal">New e-commerce for designer</div>
        <div class="p-[5px] bg-red-300 rounded-[5px] justify-start items-center gap-[9px] inline-flex">
            <div class="w-6 h-6 relative"></div>
            <div class="text-white text-sm font-normal font-['Roboto'] leading-normal">27 Jun</div>
        </div>
    </div>
    <div class="h-[88px] px-4 py-2.5 bg-red-200 rounded shadow flex-col justify-start items-start gap-2.5 flex">
        <div class="w-[216px] text-stone-900 text-base font-normal font-['Roboto'] leading-normal">Learn Big data - scikitlearn</div>
        <div class="p-[5px] bg-red-300 rounded-[5px] justify-start items-center gap-[9px] inline-flex">
            <div class="w-6 h-6 relative"></div>
            <div class="text-white text-sm font-normal font-['Roboto'] leading-normal">13 Sep</div>
        </div>
    </div>
    <div class="w-[302px] h-[5px] justify-center items-center inline-flex">
        <div class="w-[302px] h-[5px] bg-blue-500 rounded-[10px] shadow"></div>
    </div>
    <div class="h-[65px] px-4 py-2.5 bg-white rounded shadow flex-col justify-start items-start gap-2.5 flex">
        <div class="justify-start items-start gap-1 inline-flex">
            <div class="w-[63px] h-[11px] bg-green-500 rounded-[14px]"></div>
        </div>
        <div class="w-[216px] text-stone-900 text-base font-normal font-['Roboto'] leading-normal">Explore Ethereum Blockchain</div>
    </div>
</div>
*/
