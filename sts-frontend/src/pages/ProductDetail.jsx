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
  const [showConfirm, setShowConfirm] = useState(false);
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


  if (errorMsg) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">{errorMsg}</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-muted">Loading product...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light p-4">
      <ProductCard props={product} isDetail={true} />

      <div className="btn-group btn-group-sm mt-4" role="group" aria-label="Product actions">
        <Link
          to={`/products/${id}/edit`}
          className="btn btn-outline-secondary"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          className="btn btn-outline-secondary btnDelete"
        >
          Delete
        </button>
        <Link
          to="/CustomerDashboard"
          className="btn btn-outline-secondary"
        >
          Back
        </Link>
      </div>
      {showConfirm && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
