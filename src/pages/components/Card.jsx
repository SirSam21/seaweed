import { useState } from "react"


export default function Card() {
  const [cardText, setCardText] = useState("");

  return (<>
    <div href="#" className="block max-w-sm p-6 bg-white border border-emerald-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="text-gray-300">
        <h1 className="text-lg">Card Title</h1>
        <p>insane card insides</p>
      </div>
    </div>
  </>)
}