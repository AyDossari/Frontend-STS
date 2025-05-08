import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import ProductCard from '../components/ProductsCard';
import { Link } from 'react-router-dom';

function AddRequest() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAvailableProducts = async () => {
    try {
      const response = await authorizedRequest('get', '/driver-requests/');
      setProducts(response.data.available_products); 
    } catch (err) {
      console.error(err);
      setError('Failed to load available products.');
    }
  };

  const handlePickup = async (productId) => {
    try {
      await authorizedRequest('post', '/driver-requests/', {
        product: productId
      });
      navigate('/DriverDashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to create pickup request.');
    }
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  if (error) return <p>{error}</p>;
  if (!products.length) return <p>No available products for pickup.</p>;

  return (
    <>
            <div className="container mt-4">
                <div className="row">
                    {products.map(props => (
                        <div key={props.id} className="col-md-4 mb-4">
                            <ProductCard props={props} handlePickup={handlePickup} isDetail={true} isDriverView={true} />
                        </div>
                    ))}
                </div>
                <div className="mt-3 d-flex justify-content-between">
                    <Link to="/DriverDashboard" className="btn btn-dark">
                        Back
                    </Link>
                </div>
            </div>
    </>
  );
}

export default AddRequest;
