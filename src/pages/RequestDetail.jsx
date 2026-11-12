import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import DetailsCard from '../components/DetailsCard';

function RequestDetail() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [errorMsg, setError] = useState('');

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

  if (errorMsg) return <h2>{errorMsg}</h2>;
  if (!request) return <h2>Loading request...</h2>;

  return (
    <div>
      <DetailsCard props={request} />
    </div>
  );
}

export default RequestDetail;
