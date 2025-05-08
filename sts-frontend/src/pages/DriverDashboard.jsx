import { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import { authorizedRequest , logout } from '../lib/api'
import LogoutButton from '../components/LogoutButton';
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
    if (!requests.length) {
        return (
          <div className="container mt-5 text-center">
            <h2>No requests found.</h2>
            <div className="mt-3 d-flex justify-content-between">
              <LogoutButton />
              <Link to="/request/add" className="btn btn-dark">
                Add New request
              </Link>
            </div>
          </div>
        )
      }

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {requests.map(props => (
                        <div key={props.id} className="col-md-4 mb-4">
                            <RequestCard props={props}  />
                        </div>
                    ))}
                </div>
                <div className="mt-3 d-flex justify-content-between">
                    <LogoutButton />
                    <Link to="/Request/add" className="btn btn-dark">
                        Add New Requests
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DriverDashboard
