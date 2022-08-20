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
    `product/`,
    [tokenRefreshed, user]
  );
  
  console.log(products);

  return (
    <>
      <Layout role="user">
        <h1>UserDashboard</h1>
        <div className="flex justify-between">
          <h1>My Products</h1>

          <Link href={"/dashboard/my-products/addProducts"} passHref>
            <a className=" focus:outline-none text-white text-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Add Product
            </a>
          </Link>
        </div>

        {/* <h1 className="mt-8">Products</h1>
      {isProductsLoading && <p>Loading products...</p>}
      <div className="flex flex-wrap gap-4">
        {!!products &&
          products.map((p) => (
            <div className="m-4 p-2 bg-gray-300 rounded w-40" key={p.id}>
              <h1>{p.name}</h1>
              <h2>{p.description}</h2>
            </div>
          ))}
      </div> */}
        {isProductsLoading && <p>Loading products...</p>}
        {!!products &&
          products.map((p) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-8 mx-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src="https://images.unsplash.com/photo-1609692814867-d668c4487979?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {p.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {p.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price: {p.price}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Status: {p.status}
                </p>

                <a
                  href="#"
                  className="mr-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Product
                </a>
                <a
                  href="#"
                  className="ml-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
      </Layout>
    </>
  );
}
