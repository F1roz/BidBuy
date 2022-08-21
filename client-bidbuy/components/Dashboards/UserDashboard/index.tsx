import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAuthenticatedFetch from "../../../hooks/useAuthenticatedFetch";
import { IProduct } from "../../../types";
import Layout from "../../Layout";
import QRModal from "../Product/QRcode";
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
      <div className="flex flex-wrap justify-center gap-4">
        {!!products && products.map((p) => <Productitem p={p} key={p.id} />)}
      </div>
    </Layout>
  );
};

export default UserDashboard;
const Productitem = ({ p }: { p: IProduct }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full max-w-sm bg-gray-200 rounded-lg shadow-md">
      <a href="#">
        <img className="p-8 rounded-t-lg" src={p.image} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {p.name}
          </h5>
        </a>
        <p className="text-gray-700">{p.description}</p>
        <p className="text-gray-700">{p.created_at}</p>

        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900">$ {p.price}</span>
          <div className="space-x-2">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Bid Now
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Qr Code
            </button>
          </div>
        </div>
      </div>

      <div>
        <QRModal id={p.id} setShow={setShowModal} showModal={showModal} />
      </div>
    </div>
  );
};
