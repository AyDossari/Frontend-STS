import React from "react";

function ProductsCard({name , status}) {
return (
    <div>
    <h4>{name}</h4>
    <p>Status: {status}</p>
  </div>
);
}
export default ProductsCard