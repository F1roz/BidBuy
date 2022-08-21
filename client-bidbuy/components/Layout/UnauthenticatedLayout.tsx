import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { unauthenticatedNavItems } from "../../data/navItems";
import useAuth from "../../hooks/useAuth";
import NavBar from "./NavBar";

const UnauthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  if (!!user) router.push(`/dashboard`);
  return (
    <div>
      <NavBar navItems={unauthenticatedNavItems} />
      {children}
    </div>
  );
};

export default UnauthenticatedLayout;
