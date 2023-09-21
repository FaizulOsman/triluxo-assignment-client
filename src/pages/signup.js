import RootLayout from "@/layouts/RootLayout";
import { useSignUpMutation } from "@/redux/user/userApi";
import { saveToLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [signUp, { data, isError, isLoading, isSuccess, error }] =
    useSignUpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmPassword.value) {
      toast.error("Password doesn't matched!");
    } else {
      const newData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: "user",
        phone: e.target.phone.value,
      };

      try {
        await signUp(newData);
        saveToLocalStorage("access-token", data?.data?.accessToken);
        saveToLocalStorage("user-info", JSON.stringify(data?.data?.userData));
      } catch (error) {
        toast.error(`${error?.data?.message}` || "Something went wrong");
      }
    }
  };

  const router = useRouter();
  const state = router.query.state;
  useEffect(() => {
    if (isSuccess && !isLoading) {
      if (state?.path) {
        router.push(state?.path);
      } else {
        router.push("/");
      }
    }

    if (isError) {
      toast.error(`${error?.data?.message}` || "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Successfully Registered!");
    }
  }, [isLoading, router, state, isSuccess, error, isError, data]);

  return (
    <div className="py-5 relative flex flex-col justify-center min-h-screen overflow-hidden mt-16">
      <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 min-w-sm lg:w-[50vw]">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign Up
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-6">
          <div className="mb-2">
            <input
              type="name"
              name="name"
              placeholder="Name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 px-4 pt-4 justify-between gap-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-md text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-transparent hover:border-purple-600 h-8 py-1 px-2 flex items-center justify-between gap-2"
              onClick={() => toast.error("Try to login with your email.")}
              type="button"
            >
              <p>GitHub</p>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M9 19c-4.418 1.167-8-1.341-8-6 0-1.448.587-2.767 1.542-3.721C2.283 8.942 2 7.488 2 6c0-3.314 2.686-6 6-6s6 2.686 6 6c0 1.488-.283 2.942-.542 4.279C16.413 10.233 17 11.552 17 13c0 4.659-3.582 7.167-8 6zm0 0C3.582 17 0 14.492 0 10c0-5.523 4.477-10 10-10s10 4.477 10 10c0 4.492-3.582 7-9 7zm7.719-11.797C15.418 5.453 14.717 5 14 5c-1.658 0-3 .895-3 2s1.342 2 3 2c1.42 0 2.59-.938 2.914-2.215a1 1 0 00-1.86-.57zM7.586 7.586A1 1 0 106.172 9 1 1 0 007.586 7.586zM15 14a1 1 0 11-2 0 1 1 0 012 0zm-5 0a1 1 0 11-2 0 1 1 0 012 0zm1-7a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
            </button>
            <button
              className="gap-2 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 rounded-md text-white text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-transparent hover:border-red-600 h-8 py-1 px-2 flex items-center justify-between"
              onClick={() => toast.error("Try to login with your email.")}
              type="button"
            >
              <p>Google</p>
              <svg
                fill="#FFC107"
                stroke="currentColor"
                strokeWidth="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enableBackground="new 0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
  c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
  c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
  c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
