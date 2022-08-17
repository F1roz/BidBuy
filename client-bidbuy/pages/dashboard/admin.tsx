import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { jsxService } from "../../service";

const AdminPage = () => {
  useEffect(() => {
    jsxService(getCookie("Authorization")?.toString() || "")
      // service()
      .get(`user/`)
      .then((res) => res.data)
      .then(console.log)
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  return <div>AdminPage</div>;
};

export default AdminPage;
