import Link from "next/link";
import React, { ReactNode } from "react";
import { adminNavRoutes } from "../../data/navItems";
import NavBar from "./NavBar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar navItems={adminNavRoutes} />
      {children}
    </div>
  );
};

export default AdminLayout;
