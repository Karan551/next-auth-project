"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

  const router = useRouter();

  const handleLogin = async (event: FormEvent) => {
    try {
      setLoading(true);
      event.preventDefault();
      const url = "/api/users/login/";

      const response = await axios.post(url, user);

      if (!response.data.error) {
        setLoading(false);
        toast.success("Login Succesfully.", {
          duration: 2000,
          position: "top-center",
          icon: "✅",
          className: "flex text-2xl font-semibold px-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });

        setUser({
          email: "",
          password: "",
        });
        router.push("/profile");
      } else {
        setErrorMsg("Error in login");
      }
    } catch (error: any) {
      console.log("Error in Login::---", error.response.data.error);

      toast.error(`${error.response.data.error}.`, {
        duration: 3000,
        position: "top-center",

        className: "text-xl font-semibold w-full px-4",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      setLoading(false);
      setErrorMsg(error.response.data.error);
      setUser({ ...user, password: "" });
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [user]);

  if (loading)
    return (
      <div className="grid place-content-center text-3xl text-center rounded-lg p-2 min-h-screen">
        <div className="text-5xl">Loading....</div>
        <div className="loading mx-auto mt-4"></div>
      </div>
    );

  /*   if (errorMsg)
    return (
      <div className=" grid place-content-center min-h-screen">
        <div className="text-4xl font-semibold text-center rounded-lg p-4 w-full  bg-red-500 text-white ">
          Error {errorMsg}
        </div>
      </div>
    ); */

  return (
    <section className="flex flex-col justify-center items-center px-4 py-2 min-h-screen">
      <form
        className="flex flex-col justify-center my-3 bg-white/85 w-1/2 p-4 rounded-lg
       text-black border border-black"
        method="post"
        onSubmit={handleLogin}
      >
        {/* To show error Message */}
        <p
          className={
            errorMsg
              ? " text-2xl rounded-lg p-4 w-full  textwhite font-semibold text-white bg-red-500  mb-4 focus:border-black focus:text-3xl flex justify-between"
              : "absolute left-[99999px]"
          }
          aria-live="assertive"
        >
          <span>{errorMsg}</span>
          <span className="cursor-pointer px-2" onClick={() => setErrorMsg("")} role="alert">
          <FaTimesCircle />
          </span>
        </p>
        <h1 className="text-2xl sm:text-4xl text-center font-semibold">
          Login
        </h1>

        <label htmlFor="email" className="sm:text-3xl my-2 block">
          Email :-
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter Your email...."
          className="border border-black placeholder:text-gray-300 inline-block rounded-lg sm:text-2xl outline-none px-4 py-2 mb-4 focus:ring-1 focus:ring-indigo-600"
          autoComplete="username"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password" className="sm:text-3xl my-2">
          Password :-
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter Your Password...."
          className=" border border-black placeholder:text-gray-300 inline-block mb-4 rounded-lg sm:text-2xl outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          className="inline-block sm:text-3xl font-semibold rounded-lg px-4 py-2 w-3/4 text-white self-center my-3 bg-sky-500 hover:bg-sky-600
          disabled:cursor-not-allowed disabled:bg-gray-700/60 disabled:text-black/30 "
          disabled={btnDisable}
        >
          Login
        </button>
        <div className="text-sm sm:text-xl font-semibold   text-cente flex flex-col sm:flex-row sm:justify-between sm:mt-0 mt-2">
          <div>
            Don't Have an account ?{" "}
            <Link href={"/signup"} className="text-blue-500   hover:underline">
              Signup Here
            </Link>
          </div>
          <Link href={"/forgotpwd"} className="text-blue-500   hover:underline">
            Forgot Password
          </Link>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;
