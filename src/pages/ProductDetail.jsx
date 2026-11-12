import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { authorizedRequest } from '../lib/api';
import ProductCard from '../components/ProductsCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductDetail;
