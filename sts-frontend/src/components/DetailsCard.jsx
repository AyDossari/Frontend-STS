import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authorizedRequest } from '../lib/api';

function DetailsCard({ props, isDetail = false }) {
  const [productDetail, setProductDetail] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (props.product && props.product.name) {
        setProductDetail(props.product);
      } else {
        try {
          const response = await authorizedRequest('get', `/products/${props.product}/`);
          setProductDetail(response.data);
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      }
    };

    fetchProduct();
  }, [props.product]);

  const handleCancel = async () => {
    try {
      await authorizedRequest('delete', `/driver-requests/${props.id}/`);
      navigate("/DriverDashboard");
    } catch (err) {
      console.error("Failed to cancel request", err);
    }
  };

  if (!productDetail) return <p>Loading...</p>;

  return (
    <div>
      <div className="container-md d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <h4 className="mb-4">{productDetail.name}</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Customer name</label>
              <div className="form-control bg-light">{productDetail.customer?.full_name || 'N/A'}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Customer phone</label>
              <div className="form-control bg-light">{productDetail.customer?.phone_number || 'N/A'}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <div className="form-control bg-light">{productDetail.description}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Weight (kg)</label>
              <div className="form-control bg-light">{productDetail.weight}</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Serial Number</label>
              <div className="form-control bg-light">{productDetail.serial_number}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Created At</label>
              <div className="form-control bg-light">{props.created_at}</div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status:</label>
              <div className="form-control bg-light">{props.status}</div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to={`/Requests/${props.id}/edit`} className="btn btn-outline-btn btn-dark">
              Edit Request
            </Link>
            <button onClick={() => setShowConfirm(true)} className="btn btn-outline-danger">
              Cancel Request
            </button>
          </div>
        </div>
      </div>


      {showConfirm && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancel</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this request?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Back
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsCard;
