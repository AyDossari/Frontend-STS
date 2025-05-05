import React from "react";

function ProductsCard({ props, isDetail = false }) {
  return (
    <div>
      <h4>{props.name}</h4>
      {isDetail ? (
        <>
          <p>Description : {props.description}</p>
          <p>weight : {props.weight}</p>
          <p>serial number : {props.serial_number}</p>
        </>
      ) : (
        <p>Status: {props.status}</p>
      )}
    </div>
  );
}
export default ProductsCard