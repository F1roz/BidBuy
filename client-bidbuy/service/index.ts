import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { baseApiUrl } from "../consts";

export const service = (context: GetServerSidePropsContext | null = null) =>
  axios.create({
    baseURL: `${baseApiUrl}/`,
    headers: {
      token: context == null ? "" : context.req.cookies.Authorization ?? "",
    },
  });

export const jsxService = (token: string) =>
  axios.create({
    baseURL: `${baseApiUrl}`,
    headers: {
      token,
    },
  });
