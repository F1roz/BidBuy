import { AxiosError } from "axios";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from "../consts";
import { authService, jsxService } from "../service";

const useAuth = () => {
  const [user, setUser] = useState<
    | {
        id: import("e:/OneDrive - American International University-Bangladesh/AIUB/ATP 1/BidBuy/client-bidbuy/types").IUser | null;
        username: string;
        roles: string[];
      }
    | null
    | undefined
  >(undefined);
  const [tokenRefreshed, setTokenRefreshed] = useState(0);
  const router = useRouter();
  useEffect(() => {
    jsxService(getCookie(ACCESS_TOKEN_COOKIE_KEY)?.toString() || "")
      .get(`auth/current-user`)
      .then((res) => res.data)
      .then(setUser)
      .catch((error) => {
        if (
          error instanceof AxiosError &&
          !!error.response &&
          error.response.status === 400 &&
          (error.response.data.message as string)
            .trim()
            .startsWith("The Token has expired on") &&
          !!getCookie(REFRESH_TOKEN_COOKIE_KEY)
        ) {
          const refreshToken = getCookie(REFRESH_TOKEN_COOKIE_KEY)?.toString();
          if (!refreshToken) return;
          authService
            .get(`auth/refresh-token`, {
              headers: { "Refresh-Token": refreshToken },
            })
            .then((res) => res.data)
            .then((tokens) => {
              console.log("Refreshed token", new Date(Date.now()));
              setCookie(ACCESS_TOKEN_COOKIE_KEY, tokens.access_token);
              setCookie(REFRESH_TOKEN_COOKIE_KEY, tokens.refresh_token);
              setTokenRefreshed((v) => v + 1);
              if (router.asPath === "/auth/login") router.replace(`/dashboard`);
            })
            .catch((err) => {
              removeCookies(REFRESH_TOKEN_COOKIE_KEY);
            });
        } else {
          setUser(null);
        }
      });
  }, [router, tokenRefreshed]);
  return { user, tokenRefreshed };
};

export default useAuth;
