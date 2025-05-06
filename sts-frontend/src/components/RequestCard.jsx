import React, { useEffect, useState } from "react";
import { authorizedRequest } from '../lib/api';


function RequestCard({ props, isDetail = false }) {

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
  return (
    <div>
      <h4>{productDetail.name}</h4>
      {isDetail ? (
        <>
          <p>Description : {productDetail.description}</p>
          <p>weight : {productDetail.weight}</p>
          <p>serial number : {productDetail.serial_number}</p>
          <p>Created at: {props.created_at} </p>
        </>
      ) : (
        <p>Status: {props.status}</p>
      )}
    </div>
  );
}
export default RequestCard