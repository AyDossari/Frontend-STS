import { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import { authorizedRequest } from '../lib/api'


function DriverDashboard() {
    const [products, setProducts] = useState([])
    const [errorMsg, setError] = useState('')

    async function fetchDriverRequests() {
        try {
            const response = await authorizedRequest('get', '/driver-requests/')
            setProducts(response.data)
        } catch (err) {
            console.error(err)
            setError('Something went wrong while fetching driver requests.')
        }
    }

    useEffect(() => {
        fetchDriverRequests()
    }, [])

    if (errorMsg) return <h2>{errorMsg}</h2>
    if (!products.length) return <h2>No requests found.</h2>

    return (
        <>
        {products.map(props => (
        <div key={props.id}>
                <RequestCard props={props}  />
                </div>
            ))}
        </>
    )
}

export default DriverDashboard
