import { useState } from "react"
import Column from "./Column"
import Button from "./Button"

export default function Board() {
  const [columns, setColumns] = useState([])
  const [colCount, setColCount] = useState(0)

  function handleColumnAdd() {
    setColumns([...columns, {
      id: `col-${colCount + 1}`
    }])
    setColCount(prev => prev + 1)
  }

  function handleColumnDelete(id) {
    setColumns(columns.filter(column => column.id !== id))
  }

  return (<>
    {/* <BoardSettings></BoardSettings> */}
    <div className="board">
      <div className="flex w-full bg-gray-300">
        <h1>Innards of a Board</h1>
        <Button onClick={handleColumnAdd}>+ Column</Button>
      </div>
      <div className="columns-3 flex">
        <ul>
          {columns.map((column) => {
            return <li key={column.id}
              className="inline-block">
              <Column id={column.id} onColumnDelete={() => handleColumnDelete(column.id)} />
            </li>
          })}
        </ul>
      </div>
    </div>
  </>)
}
