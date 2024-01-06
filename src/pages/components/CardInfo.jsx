import { useParams } from "react-router-dom"

export default function CardInfo() {
    const { cardId } = useParams()
    
    return (<>
        <div className="w-screen h-screen inset-0 absolute bg-grey-600 opacity-50">
            <div className="bg-grey-600 w-[828px]">
                <p>{cardId}</p>
            </div>
        </div>
    </>)
}
