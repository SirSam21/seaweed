import { useEffect, useState } from "react"

export default function Card(props) {
    const [tempText, setTempText] = useState(props.card.text)
    const [committedText, setCommittedText] = useState(props.card.text)

    useEffect(() => {
        const newCard = {
            ...props.card,
            text: tempText
        }
        props.saveCard(newCard)
    }, [committedText])

    function handleTextUpdate() {
        setCommittedText(tempText)
    }

    function handleTextChange(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
        } else {
            setTempText(e.target.value)
        }
    }

    return (<>
        <div href="#" className="h-11 px-4 py-2.5 my-0.5 bg-white rounded shadow flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex flex-row">
                <textarea
                    className="w-full text-stone-900 text-base font-normal font-['Roboto'] leading-normal"
                    onChange={handleTextChange}
                    value={tempText}
                    placeholder={"Type here bruh"}
                    onBlur={handleTextUpdate}
                />
                {/* <Link to={`/boards/card/${cardId}`}>info</Link> */}
            </div>
        </div>
    </>)
}


