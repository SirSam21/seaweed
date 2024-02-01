import { useContext, useEffect, useState } from "react"
import Board from "./components/Board"
import { ReducerContext } from "../ReducerContext"

export default function Boards() {
    // const [loaded, setLoaded] = useState(false)

    const reducer = useContext(ReducerContext)

    useEffect(() => {
        console.log(reducer.state.boards[0])
    })

    // const nextBoardId = reducer.state.nextId
    // const [nextId, setNextBoardId] = useState(nextBoardId)

    // useEffect(() => {
    //     const localBoards = JSON.parse(localStorage.getItem("seaweedBoards"))

    //     if (localBoards) {
    //         const action = {
    //             type: "saveBoards",
    //             boards: localBoards
    //         }
    //         reducer.dispatch(action)
    //     } else {
    //         const action = {
    //             type: "addBoard"
    //         }
    //         reducer.dispatch(action)
    //     }
    //     setLoaded(true)
    // }, [])

    // useEffect(() => {
    //     if (loaded) {
    //         localStorage.setItem("seaweedBoards", JSON.stringify(reducer.state))
    //     }
    // }, [reducer.state, loaded])

    // if (!loaded) {
    //     return "Loading..."
    // }

    // need some kinda board id thing here if we are gonna have
    // multiple boards
    return (<>
        <div className="board-container">
            <Board
                board={reducer.state.boards[0]}
                id={0}
            />
        </div>
    </>)
}
