import { useContext } from "react"
import Button from "./Button"
import { ReducerContext } from "../../ReducerContext"

export default function BoardsMenuItems(props) {

    const reducer = useContext(ReducerContext)

    function onResetClick() {
        const action = {
            type: "reset"
        }
        reducer.dispatch(action)
    }

    return (<>
        <Button onClick={props.onColumnAdd}>
            + Add Column
        </Button>
        <Button onClick={onResetClick}>
            Reset Board
        </Button>
    </>)
}
