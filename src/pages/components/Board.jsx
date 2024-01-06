import { useEffect, useState } from "react"
import Column from "./Column"
import Button from "./Button"
import { Outlet } from "react-router-dom"

export default function Board(props) {
  const [columns, setColumns] = useState([])
  const [colCount, setColCount] = useState(0)
  
  useEffect(() => {
    setPageMenu(<>
      <div className="flex flex-c justify-items-start gap-10 px-10 w-full bg-gray-300">
        <h1>Innards of a Board</h1>
        <Button onClick={handleColumnAdd}>+ Column</Button>
      </div>
    </>)
  }, [columns])

  const { setPageMenu } = props

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
    <div className="overflow-y-hidden">
      <div className="columns-3 flex h-[1052px] bg-zinc-800">
        <ul className="whitespace-nowrap">
          {columns.map((column) => {
            return <li key={column.id}
              className="inline-block">
              <Column colId={column.id} onColumnDelete={() => handleColumnDelete(column.id)} />
            </li>
          })}
        </ul>
      </div>
      <Outlet />
    </div>
  </>)
}
