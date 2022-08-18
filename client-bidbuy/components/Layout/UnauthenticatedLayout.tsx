import Link from "next/link";
import React, { ReactNode } from "react";
import { unauthenticatedNavItems } from "../../data/navItems";
import NavBar from "./NavBar";

const UnauthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar navItems={unauthenticatedNavItems} />
      {children}
    </div>
  );
};

export default UnauthenticatedLayout;
