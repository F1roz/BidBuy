import Link from "next/link";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAuthenticatedFetch from "../../../hooks/useAuthenticatedFetch";
import { IProduct } from "../../../types";
import Layout from "../../Layout";

export default function MyProducts() {
  const { tokenRefreshed, user } = useAuth();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
    isSuccess,
    refetch,
    setData,
  } = useAuthenticatedFetch<IProduct[]>(
    `product/getProductByUserName/${user?.username}`,
    [tokenRefreshed, user],
    [user?.username]
  );

  return (
    <>
      <Layout role="user">
        <h1>UserDashboard</h1>
        <div className="flex justify-between">
          <h1>My Products</h1>

          <Link href={"/dashboard/my-products/addProducts"} passHref>
            <a className=" focus:outline-none text-white text-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2">
              Add Product
            </a>
          </Link>
        </div>

        {isProductsLoading && <p>Loading products...</p>}
        <div className="flex flex-wrap justify-center">
          {!!products &&
            products.map((p) => (
              <div
                key={p.id}
                className="my-8 mx-6 w-96 h-[500px] bg-gray-200 rounded-lg border border-gray-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  {!!p.image ? (
                    <img
                      className="rounded-t-lg aspect-[3/2] object-cover"
                      src={p.image}
                      alt=""
                    />
                  ) : (
                    <div className="w-full aspect-[3/2] bg-gray-600 rounded-t-lg text-gray-300 flex justify-center items-center">
                      Image not available
                    </div>
                  )}
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {p.name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700">
                      {p.description}
                    </p>
                    <p className="mb-3 font-normal text-gray-700">
                      Price: {p.price}
                    </p>
                    <p className="mb-3 font-normal text-gray-700">
                      Status: {p.status}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex justify-end items-center">
                  <button className="mr-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <Link href={`/dashboard/my-products/viewBids/${p.id}`}>
                      View Bids
                    </Link>
                  </button>
                  <button className="mr-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Edit Product
                  </button>
                  <button className="ml-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}
