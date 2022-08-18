import React from "react";
import useInput from "../../hooks/useInput";
import { authService } from "../../service";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "../../consts";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout";

const SignInPage = () => {
  const { user } = useAuth();
  const usernameInputController = useInput();
  const passwordInputController = useInput();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const { data: response } = await authService.post(`auth/sign-in`, {
        username: usernameInputController.value,
        password: passwordInputController.value,
      });
      setCookie(ACCESS_TOKEN_COOKIE_KEY, response.access_token);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, response.refresh_token);
      console.log({ response });
      router.replace(`/dashboard`);
    } catch (error) {
      console.log("sign-in : ", error);
    }
  };
  if (user === undefined) return <h1>Loading...</h1>;
  if (!!user) router.replace(`/dashboard`);
  if (user === null)
    return (
      <Layout>
        <div className="flex justify-center items-center flex-col gap-4 h-[80vh]">
          <h1 className="text-6xl font-bold">Sign In</h1>
          <div className="flex p-6 border-2 rounded-lg flex-col w-96 justify-center gap-10 items-center text-2xl">
            <input
              className="w-full p-4 rounded border-2"
              placeholder="Username"
              type="text"
              {...usernameInputController}
            />
            <input
              className="w-full p-4 rounded border-2"
              placeholder="Password"
              type="password"
              {...passwordInputController}
            />
            <div className="flex gap-4 justify-center">
              <button
                className="bg-green-500 text-white hover:bg-green-700 transition-colors p-4 rounded w-40"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <Link passHref href={`/auth/sign-up`}>
                <button className="bg-blue-500 text-white hover:bg-blue-700 transition-colors p-4 rounded w-40">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default SignInPage;
