import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import DetailsCard from '../components/DetailsCard';

function RequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [errorMsg, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await authorizedRequest('get', `/driver-requests/${id}/`);
        setRequest(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch request.');
      }
    };

    fetchRequest();
  }, [id]);

  const handleDelete = async () => {
    try {
      await authorizedRequest('delete', `/driver-requests/${id}/`);
      navigate('/DriverDashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to delete request.');
    }
  };

  if (errorMsg) return <h2>{errorMsg}</h2>;
  if (!request) return <h2>Loading request...</h2>;

  return (
    <div>
      <DetailsCard props={request} />
    </div>
  );
}

export default RequestDetail;
