import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "../consts";

export const getAccessToken = () =>
  getCookie(ACCESS_TOKEN_COOKIE_KEY)?.toString() || "";
