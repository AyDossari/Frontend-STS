import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';

function EditRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [errorMsg, setError] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await authorizedRequest('get', `/driver-requests/${id}/`);
        const request = response.data;
        setStatus(request.status);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch request.');
      }
    };

    fetchRequest();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await authorizedRequest("patch", `/driver-requests/${id}/`, {
        status,
      });
      navigate('/DriverDashboard');
    } catch (err) {
      console.log(err);
      setError('Failed to update request.');
    }
  };

  if (errorMsg) return <h2>{errorMsg}</h2>;

  return (
    <div className="container-md d-flex align-items-center justify-content-center min-vh-100">
      <form onSubmit={handleSubmit} className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="mb-4 text-center">Edit Pickup Request</h4>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="PickedUp">Picked Up</option>
            <option value="Stored">Stored</option>
          </select>
        </div>

        <button type="submit" className="btn btn-dark w-100">Update</button>
      </form>
    </div>
  );
}

export default EditRequest;
