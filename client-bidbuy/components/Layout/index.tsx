import React, { ReactNode } from "react";
import AdminLayout from "./AdminLayout";
import UnauthenticatedLayout from "./UnauthenticatedLayout";
import UserLayout from "./UserLayout";

const Layout = ({
  role,
  children,
}: {
  role?: "admin" | "user";
  children: ReactNode;
}) => {
  if (role === "admin")
    return (
      <AdminLayout>
        <div className="mt-20 p-4">{children}</div>
      </AdminLayout>
    );
  if (role === "user")
    return (
      <UserLayout>
        <div className="mt-20 p-4">{children}</div>
      </UserLayout>
    );
  return (
    <UnauthenticatedLayout>
      <div className="mt-20 p-4">{children}</div>
    </UnauthenticatedLayout>
  );
};

export default Layout;
