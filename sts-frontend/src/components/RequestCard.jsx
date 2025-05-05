import React from "react";

function RequestCard({ props, isDetail = false }) {
  return (
    <div>
      <h4>{props.product}</h4>
      {isDetail ? (
        <>
          <p>Description : {props.product.description}</p>
          <p>weight : {props.product.weight}</p>
          <p>serial number : {props.product.serial_number}</p>
          <p>Created at: {props.created_at} </p>
        </>
      ) : (
        <p>Status: {props.status}</p>
      )}
    </div>
  );
}
export default RequestCard