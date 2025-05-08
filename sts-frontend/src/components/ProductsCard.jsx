import React from "react";
import { Link } from 'react-router-dom';

function ProductsCard({ props, isDetail = false, isDriverView = false, handlePickup }) {

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
  

  return (
    <div className={cardClass} style={{ maxWidth: '18rem' }}>
      <div className="card-header">{props.name}</div>
      <div className="card-body">
        {isDetail ? (
          <>
            <p className="card-text">Description: {props.description}</p>
            <p className="card-text">Weight: {props.weight}</p>
            <p className="card-text">Serial Number: {props.serial_number}</p>
          </>
        ) : (
          <p className="card-text">
            <strong>Status:</strong> {props.status}
          </p>

        )}
        {isDriverView && (
          <div className="btn-group mt-3" aria-label="Actions">
          <button onClick={() => handlePickup(props.id)} className="btn btn-outline-light btn-sm">
            Pick Up
          </button>
          </div>
        )}
        {!isDetail && (
          <div className="btn-group mt-3" aria-label="Actions">
            <Link to={`/products/${props.id}`} className="btn btn-outline-light btn-sm">
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductsCard