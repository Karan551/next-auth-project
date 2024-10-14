"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [data, setData] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const toTitleCase = (text: string) => {
    return text ? text[0].toUpperCase() + text.slice(1) : "";
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout/");
      if (response.data.success) {
        toast.success("Logout Succesfully.", {
          duration: 2000,
          position: "top-center",
          icon: "✅",
          className: "flex text-2xl font-semibold px-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        setLoading(false);
        router.push("/login/");
      }
    } catch (error: any) {
      console.log("Error in Logout ::", error.message);
      setLoading(false);
      setErrorMsg(error.response.data.error);
    }
  };



  useEffect(() => {
    const getUserName = async () => {
      try {
        setLoading(true);
        const url = "/api/users/me/";
        const response = await axios.get(url);

        if (response.data) {
      
          setUser(response.data.userInfo.username);
          setData(response.data.userInfo._id);
          setLoading(false);
        }
      } catch (error: any) {
        console.log("Error::", error.message);
        setErrorMsg(error.response.data.error);
        setLoading(false);
      }
    };
    getUserName();
  }, []);

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
    <section className="flex flex-col justify-center items-center min-h-screen  px-4 py-2">
      <div className="flex flex-col my-3 bg-gray-500  w-1/2 p-4 rounded-lg text-black ">
        <div className=" font-semibold bg-white  rounded-lg p-4 flex justify-between w-full text-2xl">
          <p className="px-4 text-3xl">
            Hello &nbsp;
            <span className="text-orange-400">{toTitleCase(user)}</span>
          </p>
          <div className="flex">
            <Link
              href={`/profile/${data}/`}
              className=" px-4 py-2 rounded-lg   bg-teal-500 text-white hover:bg-teal-700 mx-2"
            >
              Click Here
            </Link>
 
            
            <Link
              href={"#"}
              onClick={handleLogout}
              className="inline-block px-4 py-2 rounded-lg  font-semibold bg-red-500 text-white hover:bg-red-700 mx-2"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
