import React, { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { IProduct, IUser } from "../../types";
import DashboardLayout from "../../components/Layout/Dashboard";
import { makeId } from "../../utils/String";
import UserList from "../../components/Dashboard/User/UserList";
import { jsxService, service } from "../../service";

const tabNames = ["Overview", "User List", "Upcoming Flights", "Flight List"];
interface Props {
  products: IProduct[] | null;
}

// export default user;
const UserDashboard: NextPage<Props> = ({ products: initialProducts }) => {
  console.log({ initialProducts });

  const [products, setProducts] = useState(initialProducts);
  const [productsRefetcher, setProductsRefetcher] = useState(false);
  useEffect(() => {
    jsxService(getCookie("Authorization")?.toString() || "")
      // service()
      .get(`product/`)
      .then((res) => res.data)
      .then(setProducts)
      .catch((err) => {
        console.log({ err });
        setProducts(null);
      });
  }, [productsRefetcher]);
  if (products === null) return <h1>Error loading data</h1>;
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </div>
  );
};
export default UserDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await service(context)
    .get(`product/`)
    .then((res) => res.data)
    .catch((err) => null);

  console.log({ products });

  return { props: { products } };
};
