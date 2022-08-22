import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { z, ZodError } from "zod";
import Layout from "../../components/Layout";
import { SignUpDto } from "../../dtos";
import { authService, jsxService } from "../../service";
import { toastZodErrors } from "../../utils/ZodUtils";
const SignUp = () => {
  const router = useRouter();
  const [config, setConfig] = useState<SignUpDto>({
    email: "",
    nid: "",
    password: "",
    password2: "",
    username: "",
  });
  const handleSignUpClick = async () => {
    try {
      const { nid, password, username, email } = z
        .object({
          username: z.string(),
          password: z.string(),
          password2: z.string(),
          nid: z.string(),
          email: z.string().email(),
        })
        .refine((data) => data.password === data.password2, {
          message: "Confirm password does not match",
          path: ["Confirm"],
        })
        .parse(config);
      await authService.post(`auth/sign-up?nid=${nid}`, {
        email,
        password,
        username,
      });
      toast.success("Sign Up Successful");
      router.push(`/auth/login`);
    } catch (error) {
      console.log({ error });
      if (error instanceof ZodError) {
        toastZodErrors(error);
      } else {
        if (typeof error === "string") toast.error(error);
        const errorMessage = z
          .string()
          .safeParse((error as any).response.data.message);
        if (errorMessage.success) toast.error(errorMessage.data);
      }
    }
  };
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            BID & BUY
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={config.email}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    value={config.username}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, username: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="nid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Nid Number
                  </label>
                  <input
                    type="nid"
                    name="nid"
                    id="nid"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    value={config.nid}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, nid: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={config.password}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, password: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={config.password2}
                    onChange={(e) =>
                      setConfig((c) => ({ ...c, password2: e.target.value }))
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSignUpClick}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/login">
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;
