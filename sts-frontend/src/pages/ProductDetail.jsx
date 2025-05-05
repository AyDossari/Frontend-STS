import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import ProductCard from '../components/ProductsCard'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMsg, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await authorizedRequest('get', `/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await authorizedRequest('delete', `/products/${id}/`);
      navigate('/CustomerDashboard'); 
    } catch (err) {
      console.error(err);
      setError('Failed to delete product.');
    }
  };
  

  if (errorMsg) return <h2>{errorMsg}</h2>;
  if (!product) return <h2>Loading product...</h2>;

  return (
    <div>
    <ProductCard props={product} isDetail={true} />
    <Link to={`/products/${id}/edit`}> Edit Product </Link>
    <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductDetail;
