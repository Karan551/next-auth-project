"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(true);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const verifyUserEmail = async () => {
    try {

      const response = await axios.post("/api/users/verifyemail/", token);

      if (response.data.success) {
        toast.success("Email Verification Succes.", {
          duration: 2000,
          position: "top-center",
          icon: "✅",
          className: "flex text-2xl font-semibold px-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        setIsVerified(true);
      }
    } catch (error: any) {
      console.log("Error in Email Verification ::", error.message);
      console.log("Email verify error", error.response.data.error);

      setErrorMsg(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    console.log("this is url token::", urlToken);
    setToken(JSON.stringify({ token: urlToken }) || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

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
    <section className="flex flex-col justify-center items-center min-h-screen  px-4 py-2 space-y-4">
      <h1 className="text-4xl font-semibold">Email Verification .</h1>
      {isVerified && (
        <div className="space-y-4">
          <h2 className="text-3xl text-green-400 font-semibold">
         <span className="px-2 text-3xl"> ✅</span>  Email Verification Successfull.
          </h2>
         
          <Link
            href={"/login"}
            className="text-3xl px-4 py-2 rounded-lg my-2 block text-center  bg-teal-500 text-white hover:bg-teal-700 mx-2"
          >
            Login
          </Link>
         
        </div>
      )}
    </section>
  );
}
