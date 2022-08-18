import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "../../consts";
import useAuth from "../../hooks/useAuth";

const NavBar = ({
  navItems,
}: {
  navItems: { name: string; link: string }[];
}) => {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user);

  const handleLogoutCLick = async () => {
    removeCookies(ACCESS_TOKEN_COOKIE_KEY);
    removeCookies(REFRESH_TOKEN_COOKIE_KEY);
    router.replace(`/auth/login`);
  };
  return (
    <nav className="flex gap-4 fixed top-0 left-0 right-0 justify-end text-xl px-6 py-3 bg-white shadow-xl font-medium text-gray-600">
      {navItems.map((item, idx) => (
        <Link href={item.link} passHref key={idx + item.name + item.link}>
          <a className="hover:text-black transition-colors">{item.name}</a>
        </Link>
      ))}
      {!!user && <div>User : {user.username}</div>}
      {!!user && (
        <div
          onClick={handleLogoutCLick}
          className="select-none cursor-pointer hover:text-black transition-colors"
        >
          Logout
        </div>
      )}
    </nav>
  );
};

export default NavBar;
