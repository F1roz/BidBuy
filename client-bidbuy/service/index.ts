import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { ACCESS_TOKEN_COOKIE_KEY, baseApiUrl } from "../consts";

export const service = (context: GetServerSidePropsContext | null = null) =>
  axios.create({
    baseURL: `${baseApiUrl}/`,
    headers: {
      AUTHORIZATION:
        context == null
          ? ""
          : context.req.cookies[ACCESS_TOKEN_COOKIE_KEY] ?? "",
    },
  });

export const jsxService = (token: string) =>
  axios.create({
    baseURL: `${baseApiUrl}`,
    headers: {
      AUTHORIZATION: token,
    },
  });

export const authService = axios.create({
  baseURL: `${baseApiUrl}`,
});
