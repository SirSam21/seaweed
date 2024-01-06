import Board from "./components/Board"

export default function Boards(props) {
  const { setPageMenu } = props
  return (<>
    <div className="overflow-hidden">
      <Board setPageMenu={setPageMenu}></Board>
    </div>
  </>)
}
