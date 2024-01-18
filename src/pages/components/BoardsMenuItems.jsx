import Button from "./Button"

export default function BoardsMenuItems(props) {

    return (<>
        <Button onClick={props.onColumnAdd}>
            + Add Column
        </Button>
        <Button onClick={props.onResetClick}>
            Reset Board
        </Button>
    </>)
}
