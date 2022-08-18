import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_COOKIE_KEY } from "../../consts";
import useAuth from "../../hooks/useAuth";
import useAuthenticatedFetch from "../../hooks/useAuthenticatedFetch";
import { jsxService } from "../../service";
import { IProduct } from "../../types";
import Layout from "../Layout";
import SideBar from "../Layout/SideBar";

const UserDashboard = () => {
  const { tokenRefreshed, user } = useAuth();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
    isSuccess,
    refetch,
    setData,
  } = useAuthenticatedFetch<IProduct[]>("product/", [tokenRefreshed]);
  return (
    <Layout role="user">
      <h1>UserDashboard</h1>
      <h1 className="mt-8">Products</h1>
      {isProductsLoading && <p>Loading products...</p>}
      <div className="flex flex-wrap gap-4">
        {!!products &&
          products.map((p) => (
            <div className="m-4 p-2 bg-gray-300 rounded w-40" key={p.id}>
              <h1>{p.name}</h1>
              <h2>{p.description}</h2>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default UserDashboard;
