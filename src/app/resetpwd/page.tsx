"use client";
import axios from "axios";

import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {toast} from "react-hot-toast"

export default function ResetPwdPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [token, setToken] = useState("");

  const [btnDisable, setBtnDisable] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (validMatch) {
      
        

        const response = await axios.post("/api/users/resetpwd/", {
          token,
          password,
        });


        setPassword("");
        setConfirmPassword("");
        toast.success("Password Reset Successfully.", {
          duration: 2000,
          position: "top-center",
          icon: "✅",
          className: "flex text-2xl font-semibold px-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });

        // here we will redirect to login page.
        router.push("/login/")
      }
    } catch (error: any) {
      console.log("Error in reset password verification::", error.message);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    setValidMatch(password === confirmPassword);

  }, [password, confirmPassword]);



  useEffect(() => {
    const urlToken = searchParams.get("token");

    setToken(urlToken || "");
  }, [token]);


  if (errorMsg)
    return (
      <div className=" grid place-content-center min-h-screen">
        <div className="text-4xl font-semibold text-center rounded-lg p-4 w-full  bg-red-500 text-white ">
          Error {errorMsg}
        </div>
      </div>
    );
  return (
    <section className="flex flex-col justify-center items-center min-h-screen  px-4 py-2">
      <form
        className="flex flex-col justify-center my-3 bg-white/85 w-1/2 p-4 rounded-lg
        text-black border border-black"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl sm:text-4xl text-center font-semibold">
          Reset Password Page.
        </h1>

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword" className="sm:text-3xl my-2">
          Confirm Password :-
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Confirm Your Password...."
          className=" border border-black placeholder:text-gray-300 inline-block mb-4 rounded-lg sm:text-2xl outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="inline-block sm:text-3xl font-semibold rounded-lg px-4 py-2 w-3/4 text-white self-center my-3 bg-sky-500 hover:bg-sky-600
          disabled:cursor-not-allowed disabled:bg-gray-700/60 disabled:text-black/30 "
          disabled={!password || !confirmPassword ||!validMatch }
        >
          Submit
        </button>
      </form>
    </section>
  );
}
