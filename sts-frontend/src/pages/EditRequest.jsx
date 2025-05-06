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
    <div>
      <h2>Edit Pickup Request</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">-- Select Status --</option>
          <option value="PickedUp">Picked Up</option>
          <option value="Stored">Stored</option>
        </select>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditRequest;
