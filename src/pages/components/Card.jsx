import { useEffect, useState, useContext } from "react"
import { ReducerContext } from "../../ReducerContext"

export default function Card(props) {

    const reducer = useContext(ReducerContext)
    const card = reducer.state.boards[props.boardId].columns[props.columnId].cards[props.id]
    console.log(reducer.state.boards[props.boardId])
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

    function handleTextUpdate() {
        setCommittedText(tempText)
    }

    function handleTextChange(e) {
        setTempText(e.target.value)
    }

    function handleTextReset(e) {
        if (e.key === "Escape") {
            setTempText(committedText)
            e.blur()
        }
    }

    return (<> {/* h-11 px-4 py-2.5 my-0.5 bg-white rounded shadow flex-col justify-start items-start gap-2.5 inline-flex */}
        <textarea
            onChange={handleTextChange}
            value={tempText}
            placeholder={"Type here bruh"}
            onBlur={handleTextUpdate}
            onKeyUp={handleTextReset}
        />
        {/* <Link to={`/boards/card/${cardId}`}>info</Link> */}
    </>)
}


