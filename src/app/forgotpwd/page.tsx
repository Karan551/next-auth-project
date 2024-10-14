"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function normalUserPage() {
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const normalUser = async (e: FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault();
      const response = await axios.post("/api/users/forgotpassword/", JSON.stringify({email}));


      if (response.data.success) {
     
        toast.success("Check Your Email.", {
          duration: 2000,
          position: "top-center",
          icon: "✅",
          className: "flex text-2xl font-semibold px-2",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        setLoading(false)
        setEmail("")
        
      } 
    } catch (error: any) {
      console.log("Reset Password Error::", error);
      console.log(error.response)
      setLoading(false)
      toast.error("User not found.", {
        duration: 2000,
        position: "top-center",
        className: "flex text-2xl font-semibold px-2",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      setErrorMsg(error.response.data.message);
    } 
  };

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
      <form
        className="flex flex-col justify-center my-3 bg-white/85 w-1/2 p-4 rounded-lg
        text-black border border-black"
        method="post"
          onSubmit={normalUser}
      >
        <h1 className="text-2xl sm:text-4xl text-center font-semibold">
          Forgot Password Page.
        </h1>
        <div className="w-full">
          <label htmlFor="email" className="sm:text-3xl my-2 block">
            Email :-
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter Your email...."
            className="w-full border border-black placeholder:text-gray-300 inline-block rounded-lg sm:text-2xl outline-none px-4 py-2 mb-4 focus:ring-1 focus:ring-indigo-600"
            autoComplete="username"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
        </div>

       

        <button
          className="inline-block sm:text-3xl font-semibold rounded-lg px-4 py-2 w-3/4 text-white self-center my-3 bg-sky-500 hover:bg-sky-600
          disabled:cursor-not-allowed disabled:bg-gray-700/60 disabled:text-black/30 "
          //   disabled={btnDisable}
        >
          Submit
        </button>
      </form>


    </section>
  );
}
