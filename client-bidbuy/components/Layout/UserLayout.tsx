import React, { ReactNode } from "react";
import { userNavRoutes } from "../../data/navItems";
import useAuth from "../../hooks/useAuth";
import NotFoundPage from "../../pages/404";
import NavBar from "./NavBar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (user === undefined) return <h1>Loading...</h1>;
  if (!!user && user.roles.includes("user"))
    return (
      <div>
        <NavBar navItems={userNavRoutes} />
        {children}
      </div>
    );
  return <NotFoundPage />;
};

export default UserLayout;
