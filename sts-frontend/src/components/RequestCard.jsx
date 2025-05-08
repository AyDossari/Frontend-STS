import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorizedRequest } from '../lib/api';

function RequestCard({ props, isDetail = false, isDriverView = false, handlePickup }) {
  const [productDetail, setProductDetail] = useState(null);

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

  if (!productDetail) return <p>Loading...</p>;

  let cardClass = "card mb-3";

  if (props.status === "Pending") {
    cardClass += " text-bg-warning";
  } else if (props.status === "Approved") {
    cardClass += " text-bg-success";
  } else if (props.status === "PickedUp") {
    cardClass += " text-bg-primary";
  } else if (props.status === "Stored") {
    cardClass += " text-bg-info";
  } else {
    cardClass += " text-bg-light";
  }

  if (!productDetail) return null;

  return (
    <div className={cardClass} style={{maxWidth: '18rem', width: '100%', margin: '0 auto'}}>
      <div className="card-header">{productDetail.name}</div>
      <div className="card-body">
        {isDetail ? (
          <>
            <p className="card-text">Description: {productDetail.description}</p>
            <p className="card-text">Weight: {productDetail.weight}</p>
            <p className="card-text">Serial Number: {productDetail.serial_number}</p>
            <p className="card-text">Customer: {productDetail.customer?.full_name || 'N/A'}</p>
            <p className="card-text">Phone: {productDetail.customer?.phone_number || 'N/A'}</p>
            <p className="card-text">Created at: {props.created_at}</p>
          </>
        ) : (
          <p className="card-text">
            <strong>Status:</strong> {props.status}
          </p>
        )}

        {isDriverView && (
          <button onClick={() => handlePickup(props.id)} className="btn btn-primary mt-2">
            Pick Up
          </button>
        )}

        {!isDetail && (
          <div className="btn-group mt-3" aria-label="Actions">
            <Link to={`/Requests/${props.id}`} className="btn btn-outline-light btn-sm">
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
