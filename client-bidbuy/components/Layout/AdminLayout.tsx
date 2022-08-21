import React, { ReactNode } from "react";
import { adminNavRoutes } from "../../data/navItems";
import useAuth from "../../hooks/useAuth";
import NotFoundPage from "../../pages/404";
import NavBar from "./NavBar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (user === undefined) return <h1>Loading...</h1>;
  if (!!user && user.roles.includes("admin"))
    return (
      <div>
        <NavBar navItems={adminNavRoutes} />
        {children}
      </div>
    );
  return <NotFoundPage />;
};

export default AdminLayout;
