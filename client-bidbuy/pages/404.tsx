import React from "react";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";

const NotFoundPage = () => {
  const { user } = useAuth();
  return (
    <Layout role={!!user ? (user.roles[0] as "user" | "admin") : undefined}>
      <div className="mt-[30%]">
        <h1 className="text-center text-7xl font-extrabold">Error 404</h1>
        <h1 className="text-center text-2xl font-medium mt-4">
          The page you are requested could not be found
        </h1>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
