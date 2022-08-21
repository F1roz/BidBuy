import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { CreateBidDto } from "../../../../dtos";
import useAuthenticatedFetch from "../../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../../service";
import { IBid, IProduct } from "../../../../types";
import NotFoundPage from "../../../404";

const BidProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product } = useAuthenticatedFetch<IProduct>(
    `product/${productId}`,
    [],
    [productId]
  );
  const { data: bids, refetch: refetchBids } = useAuthenticatedFetch<IBid[]>(
    `bid/getByProductID/${productId}`,
    [],
    [productId]
  );
  const [addingBid, setAddingBid] = useState<CreateBidDto>({
    productId: !!productId ? +productId : 0,
    bidPrice: 0,
  });
  const handleAddBid = () => {
    jsxService()
      .post(`bid/create`, addingBid)
      .then((res) => res.data)
      .then(console.log)
      .then(() => refetchBids())
      .catch(console.error);
  };

  console.log({ bids });

  if (product === null) return <NotFoundPage />;
  return (
    <Layout role="user">
      <h1>BidProduct</h1>
      {!!product && (
        <div className="flex">
          <div className="w-full">
            <div className="space-y-3 mt-10">
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <h2 className="text-2xl">{product.description}</h2>
              <h2 className="text-xl">Min Bid Price : ${product.price}</h2>
            </div>
            <div>
              <input
                value={addingBid.bidPrice || ""}
                onChange={(e) =>
                  setAddingBid((v) => ({
                    ...v,
                    bidPrice: isNaN(e.target.valueAsNumber)
                      ? 0
                      : e.target.valueAsNumber,
                  }))
                }
                className="border-2 border-gray-200"
                type="number"
              />
              <button onClick={handleAddBid}>Add Bid</button>
            </div>
            <div className="mt-8 mx-8">
              <h1 className="text-center font-medium text-xl my-4">
                {!!bids && bids.length > 0
                  ? "Bids for this product"
                  : "No bids added"}
              </h1>
              {bids === null ? (
                <h1>Error loading bids</h1>
              ) : bids === undefined ? (
                <h1>Loading Bids</h1>
              ) : (
                !!bids &&
                bids.map((bid) => (
                  <div key={bid.id}>
                    <div className="flex w-full">
                      <h1 className="w-3/5 border-2 border-gray-300 text-center p-2 rounded-l">
                        {bid.bidder?.kyc?.name}
                      </h1>
                      <h1 className="w-2/5 border-2 border-gray-300 text-right p-2 rounded-r">
                        {bid.bidPrice}
                      </h1>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full relative aspect-square">
            <img
              src={product.image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BidProduct;
