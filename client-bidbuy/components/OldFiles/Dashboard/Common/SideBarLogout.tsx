import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
const SideBarLogout = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("Authorization");
    router.reload();
  };
  return (
    <div className="rounded p-2 w-full transition-colors hover:bg-red-600 hover:text-white cursor-pointer">
      <div onClick={handleLogout} className="w-48 mx-auto">
        Logout
      </div>
    </div>
  );
};

export default SideBarLogout;
