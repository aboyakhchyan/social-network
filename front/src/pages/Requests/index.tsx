import { useEffect, useState } from "react"
import { handleAccept, handleDecline, handleRequests } from "../../lib/api"
import { IRequest } from "../../lib/types"
import { toast } from "react-toastify"

export const Requests = () => {

    const [requests, setRequests] = useState<IRequest[]>([])

    useEffect(() => {
        handleRequests()
        .then(response => {
            if(response.status === 'ok') {
                setRequests(response.payload as IRequest[])      
            }
        })
    }, [])

    const onAccept = (id: number): void => {
        handleAccept(id)
        .then(response => {
            if(response.status == 'ok') {
                setRequests(requests.filter(request => request.id != id))
                toast('Accepted')
            }
        })
    }

    const onDecline = (id: number): void => {
        handleDecline(id)
        .then(response => {
            if(response.status == 'ok') {
                setRequests(requests.filter(request => request.id != id))
                toast('Cancelled')
            }
        })
    }

    return (
        <div className="gradient-custom-2 requests">
            <h2>Requests</h2>

            <div className="block-requests">
                {
                    requests.map(request => 
                        <div className="list-request" key={request.id}>
                            <p>{request.user.name} {request.user.surname}</p>
                            <button 
                                className="btn btn-outline-success"
                                onClick={() => onAccept(request.id)}
                            >accept</button>
                            <button 
                                className="btn btn-outline-danger"
                                onClick={() => onDecline(request.id)}
                            >decline</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}