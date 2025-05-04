import React from "react";

function ProductsCard({props}) {
return (
    <div>
    <h4>{props.name}</h4>
    <p>Status: {props.status}</p>
  </div>
);
}
export default ProductsCard