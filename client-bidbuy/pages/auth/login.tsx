import { NextPage } from "next";
import React from "react";
import useInput from "../../hooks/useInput";
import { service } from "../../service";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

const SignInPage: NextPage = () => {
  const usernameInputController = useInput();
  const passwordInputController = useInput();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", usernameInputController.value);
      formData.append("password", passwordInputController.value);
      const { data: response } = await service().post(`login`, formData);
      // setCookie("Authorization", response);
      console.log({ response });
      // router.reload();
      // if (response) {
      //   router.push("/dashboard");
      // }
      // console.log("Authorization: " + response);
      // const hi = getCookie("Authorization")?.toString();
      // console.log("hi: " + hi);
    } catch (error) {
      console.log("sign-in : ", error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-[100vh]">
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
  );
};

export default SignInPage;
