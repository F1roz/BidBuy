import { useRouter } from "next/router";
import React from "react";
import useAuthenticatedFetch from "../../../../hooks/useAuthenticatedFetch";
import { IProduct } from "../../../../types";

const BidProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product } = useAuthenticatedFetch<IProduct>(
    `product/${productId}`,
    [],
    [productId]
  );
  return (
    <div>
      <h1>BidProduct</h1>
      {!!product && (
        <div>
          <h1>{product.name}</h1>
        </div>
      )}
    </div>
  );
};

export default BidProduct;
