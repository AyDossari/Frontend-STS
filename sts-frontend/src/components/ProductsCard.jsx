import React from "react";

function ProductsCard({ props, isDetail = false }) {
  return (
    <div>
      <h4>{props.name}</h4>
      {/* From react doc `https://legacy.reactjs.org/docs/conditional-rendering.html?utm_source=chatgpt.com` */}
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