import { useParams } from "react-router-dom"

export default function CardInfo() {
    const { cardId } = useParams()
    
    return (<>
        <div>
            <p>{cardId}</p>
        </div>
    </>)
}
