import Link from "next/link";
import React, { ReactNode } from "react";
import { userNavRoutes } from "../../data/navItems";
import NavBar from "./NavBar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar navItems={userNavRoutes} />
      {children}
    </div>
  );
};

export default UserLayout;
