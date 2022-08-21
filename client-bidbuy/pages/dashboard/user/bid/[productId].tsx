/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../../../components/Layout";
import { CreateBidDto } from "../../../../dtos";
import useAuth from "../../../../hooks/useAuth";
import useAuthenticatedFetch from "../../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../../service";
import { IBid, IProduct } from "../../../../types";
import NotFoundPage from "../../../404";

const BidProduct = () => {
  const router = useRouter();
  const { user } = useAuth();
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
    if (!product) return;
    if (!bids) return;
    if (!user) return;
    if (product.seller === user.id) {
      return toast.error("You can't bid on your own product");
    }
    if (addingBid.bidPrice <= product.price) {
      toast.error("Bid price must be higher than Starting price");
      return;
    }
    if (bids.length > 0 && addingBid.bidPrice <= bids?.[0].bidPrice) {
      toast.error("Bid price must be higher than current highest bid");
      return;
    } else {
      console.log(addingBid);

      jsxService()
        .post(`bid/create`, addingBid)
        .then((res) => res.data)
        .then(console.log)
        .then(() => {
          toast.success("Bid added successfully");
        })
        .then(() => refetchBids())
        .catch(console.error);
    }
  };

  console.log({ bids });

  if (product === null) return <NotFoundPage />;
  return (
    <Layout role="user">
      <h1>BidProduct</h1>

      <div>
        {/* 
<!-- Example -->
<!-- Wrapper--> */}
        {!!product && (
          <div className="wrapper pt-1 px-48 flex flex-col items-center">
            {/* <!-- Card--> */}
            <article className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border sm:w-3/6 w-full">
              <div className="flex pb-6 items-center justify-between">
                <div className="flex">
                  <div className="flex flex-col">
                    <div>
                      <a
                        className="inline-block text-lg font-bold dark:text-white"
                        href=""
                      >
                        Owner : {product?.seller?.kyc?.name}
                      </a>
                    </div>
                    <div className="text-slate-500  dark:text-slate-400">
                      Posted on: {product?.created_at?.slice(0, 10)}
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-extrabold dark:text-white">
                Name: {product?.name}
              </h2>
              <div className="py-4">
                <div className="flex justify-between gap-1 mb-1">
                  <a className="flex" href="#">
                    <img
                      className="max-w-full rounded-br-lg justify-center"
                      src={product?.image}
                    />
                  </a>
                </div>
              </div>
              <p className="dark:text-slate-200 pb-8">
                Description: {product?.description}
              </p>
              <p className="dark:text-slate-200 pb-8">
                Starting price: {product?.price}
              </p>

              <div className="relative">
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
                  className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-white font-medium pr-20 text-white"
                  type="number"
                  placeholder="Write a comment"
                />
                <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
                  <svg
                    className="fill-blue-500 dark:fill-slate-50"
                    style={{ width: " 24px", height: "24px" }}
                    viewBox="0 0 24 24"
                    onClick={handleAddBid}
                  >
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                  </svg>
                </span>
              </div>
              {/* <!-- Comments content --> */}
              <div className="pt-6">
                {/* <!-- Comment row --> */}
                <h1 className="text-center font-medium text-xl my-4 text-slate-300">
                  {!!bids && bids.length > 0
                    ? "Bids for this product"
                    : "No bids added"}
                </h1>
                {bids === null ? (
                  <h1>Error loading bids</h1>
                ) : bids === undefined ? (
                  <h1>Loading Bids</h1>
                ) : (
                  bids &&
                  bids.map &&
                  bids.map((bid) => (
                    <div key={bid.id} className="media flex pb-4">
                      <div className="media-body">
                        <div>
                          <a
                            className="inline-block text-slate-500 dark:text-slate-300 text-base font-bold mr-2"
                            href="#"
                          >
                            {bid.bidder?.kyc?.name}
                          </a>
                          <span className="text-white dark:text-white">
                            {bid.createdAt?.slice(0, 10)}
                          </span>
                        </div>
                        <p className="text-slate-500">
                          Bided Price : {bid.bidPrice}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* <!-- End Comments content --> */}
            </article>
          </div>
        )}
        {/* <!-- End Wrapper--> */}
      </div>
    </Layout>
  );
};

export default BidProduct;
