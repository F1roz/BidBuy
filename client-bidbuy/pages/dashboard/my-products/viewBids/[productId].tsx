/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { CreateBidDto } from "../../../../dtos";
import useAuthenticatedFetch from "../../../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../../../service";
import { IProduct, IBid } from "../../../../types";
import NotFoundPage from "../../../404";
import { Toaster, toast } from "react-hot-toast";

const ViewBid = () => {
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
  //get 1st value from bids
  
  const handleSell = (buyerId: number, sellPrice: number) => {
    jsxService()
      .put(
        `product/sellProduct?id=${productId}&buyerId=${buyerId}&sellPrice=${sellPrice}`
      )
      .then((res) => res.data)
      .then(console.log)
      .then(() => {
        toast.success("Product sold successfully");
      })
      .then(() => refetchBids())
      .catch(console.error);
  };

  if (product === null) return <NotFoundPage />;
  return (
    <Layout role="user">
      <h1>View Bids</h1>

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
                    <div className="text-slate-500 dark:text-slate-300 dark:text-slate-400">
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
              {/* <!-- Comments content --> */}
              <div className="pt-6">
                {/* <!-- Comment row --> */}
                <h1 className="text-center font-medium text-xl my-4 text-slate-300">
                  {!!bids && bids.length > 0
                    ? "Bids for this product"
                    : "No bids added"}
                  {product.status === "sold" && (
                    <h1 className="text-red-600">
                      Product is Sold to {product.seller?.kyc?.name}
                    </h1>
                  )}
                </h1>
                {bids === null ? (
                  <h1>Error loading bids</h1>
                ) : bids === undefined ? (
                  <h1>Loading Bids</h1>
                ) : (
                  bids &&
                  bids.map &&
                  bids.map((bid, index) => (
                    //get first bid id
                    <div key={index} className="media flex pb-4">
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
                          {/* ID: {bid.bidder?.id} */}
                        </p>
                      </div>

                      {product.status.trim() !== "sold" && (
                        <button
                          onClick={() => {
                            if (!!bid && !!bid.bidder) {
                              handleSell(bid.bidder.id, bid.bidPrice);
                            }
                          }}
                          className="ml-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Sell
                        </button>
                      )}
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

export default ViewBid;
