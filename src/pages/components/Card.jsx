import { useState } from "react"
import Button from "./Button.jsx"
import { Link } from "react-router-dom"

export default function Card(props) {
  const [cardText, setCardText] = useState("");
  const { cardId } = props

  return (<>
    <div href="#" className="h-11 px-4 py-2.5 my-0.5 bg-white rounded shadow flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="flex flex-row">
      <input
      type="text"
      className="w-[216px] text-stone-900 text-base font-normal font-['Roboto'] leading-normal"
      onChange={(e) => setCardText(e.target.value)}
      value={cardText}
      placeholder={cardId}
      />
      <Link to={`/boards/card/${cardId}`}>info</Link>
      </div>
    </div>
  </>)
}


