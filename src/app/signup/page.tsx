"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const url = "/api/users/signup/";
      const response = await axios.post(url, user);

      if (response.data.success) {
        toast.success("Signup Successfull. Please Login.", {
          duration: 3000,
          position: "top-center",
          icon: "✅",
          className: "text-xl font-semibold w-full p-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });

        setLoading(false);

        setUser({
          username: "",
          email: "",
          password: "",
        });

        router.push("/login/");
      }
    } catch (error: any) {
      setLoading(false);

      toast.error(`${error.message}.`, {
        duration: 3000,
        position: "top-center",
        icon: "❌",
        className: "text-xl font-semibold w-full px-4",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      console.log("Error in Signup::", error.message);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  if (loading)
    return (
      <div className="grid place-content-center text-3xl text-center rounded-lg p-2 min-h-screen">
        <div className="text-5xl">Loading....</div>
        <div className="loading mx-auto mt-4"></div>
      </div>
    );

  if (errorMsg)
    return (
      <div className=" grid place-content-center min-h-screen">
        <div className="text-4xl font-semibold text-center rounded-lg p-4 w-full  bg-red-500 text-white ">
          Error {errorMsg}
        </div>
      </div>
    );
  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-screen px-4 py-2">
        <form
          className="flex flex-col my-3 bg-white  w-1/2 p-4 rounded-lg text-black border-black border "
          method="post"
          onSubmit={handleSignUp}
        >
          <h1 className="text-4xl text-center font-semibold">Signup</h1>

          <label htmlFor="username" className="text-3xl my-2">
            Username :-
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Enter Your Username...."
            className="placeholder:text-gray-300 inline-block rounded-lg text-2xl mb-4 outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600 border border-black"
            autoComplete="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <label htmlFor="email" className="text-3xl my-2 block">
            Email :-
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Your email...."
            className="placeholder:text-gray-300 inline-block rounded-lg text-2xl outline-none px-4 py-2 mb-4 focus:ring-1 focus:ring-indigo-600 border border-black"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label htmlFor="password" className="text-3xl my-2">
            Password :-
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter Your Password...."
            className="placeholder:text-gray-300 inline-block mb-4 rounded-lg text-2xl outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600 border border-black"
            autoComplete="current-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            className="inline-block text-3xl font-semibold rounded-lg px-4 py-2 w-3/4 text-white self-center my-3 bg-sky-500 hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-700/60 disabled:text-black/30"
            disabled={btnDisabled}
          >
            Signup
          </button>
          <div className="text-2xl font-semibold   text-center">
            Already Have an account ?{" "}
            <Link href={"/login"} className="text-blue-500   hover:underline">
              Login Here
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignUpPage;
