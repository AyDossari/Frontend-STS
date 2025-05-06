import { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import { authorizedRequest , logout } from '../lib/api'
import { Link } from 'react-router-dom';


function DriverDashboard() {
    const [requests, setRequests] = useState([]);
    const [errorMsg, setError] = useState('')

    async function fetchDriverRequests() {
        try {
            const response = await authorizedRequest('get', '/driver-requests/')
            setRequests(response.data.requests)
        } catch (err) {
            console.error(err)
            setError('Something went wrong while fetching driver requests.')
        }
    }

    useEffect(() => {
        fetchDriverRequests()
    }, [])

    if (errorMsg) return <h2>{errorMsg}</h2>
    if (!requests.length) return <h2>No requests found.</h2>

    return (
        <>
        {requests.map(props => (
        <div key={props.id}>
                <RequestCard props={props}  />
                <Link to={`/Requests/${props.id}`}>View Details</Link>
                </div>
            ))}
        </>
    )
}

export default DriverDashboard
