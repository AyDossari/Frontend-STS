import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import ProductCard from '../components/ProductsCard';

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
      <h2>Available Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <ProductCard props={product} />
          <button onClick={() => handlePickup(product.id)}>Pick Up</button>
        </div>
      ))}
    </>
  );
}

export default AddRequest;
