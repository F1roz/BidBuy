/* eslint-disable react-hooks/exhaustive-deps */
import { getCookie } from "cookies-next";
import React, {
  DependencyList,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ACCESS_TOKEN_COOKIE_KEY } from "../consts";
import { jsxService } from "../service";
import useAuth from "./useAuth";

const useAuthenticatedFetch = <T>(
  apiUrl: string,
  deps: DependencyList,
  mustDefines: any[] = []
) => {
  const { user, tokenRefreshed } = useAuth();
  const [data, setData] = useState<T | undefined | null>(undefined);
  const [refetchHelper, setRefetchHelper] = useState(false);
  const refetch = useCallback(() => {
    setRefetchHelper((v) => !v);
  }, []);
  const isLoading = useMemo(() => {
    return data === undefined;
  }, [data]);
  const isError = useMemo(() => {
    return data === null;
  }, [data]);
  const isSuccess = useMemo(() => {
    return data !== null && data !== undefined;
  }, [data]);
  useEffect(() => {
    if (mustDefines.every((v) => !!v)) {
      jsxService(getCookie(ACCESS_TOKEN_COOKIE_KEY)?.toString() || "")
        .get(apiUrl)
        .then((res) => res.data)
        .then(setData)
        .catch((err) => {
          console.log(`Error fetching ${apiUrl} : `, err);
          setData(null);
        });
    }
  }, [...deps, refetchHelper, user, tokenRefreshed]);
  return { data, setData, refetch, isLoading, isError, isSuccess };
};

export default useAuthenticatedFetch;
