"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function UserProfile({ params }: any) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [userDetail, setUserDetail] = useState<User>({
    username: "",
    email: "",
    isVerified: false,
    isAdmin: false,
    createdAt: "",
    updatedAt: "",
  });

  const userId = params.userInfo;
  const router = useRouter();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const url = "/api/users/me/";
        const response = await axios.get(url);
        console.log("this is response", response);
        if (response.data) {
          console.log("this is response----", response.data);
          console.log("this ----", response.data.userInfo);
          setUserDetail(response.data.userInfo);
        }
      } catch (error: any) {
        console.log("Error::", error.message);
        setErrorMsg(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    getUserName();
  }, []);

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
    <section className="flex flex-col justify-center items-center min-h-screen  px-4 py-6 text-3xl">
      <div className="bg-white rounded-lg px-4 py-6 w-1/2 space-y-3 text-black border border-black">
        <h1 className="text-4xl text-center my-2 bg-gray-300 py-3 rounded-lg">
          User Information :-
        </h1>
        <p>
          Name :{" "}
          <span className="text-blue-500">
            {userDetail.username.toUpperCase()}
          </span>
        </p>
        <p>
          Email :<span className="text-blue-500 px-2">{userDetail.email}</span>
        </p>
        <p>
          Verification Status :{" "}
          <span className="text-blue-500 px-2">
            {userDetail.isVerified ? "True" : "False"}
          </span>{" "}
        </p>

        <button
          className="inline-block px-6 py-4 rounded-lg  font-semibold bg-red-500 text-white hover:bg-red-700 mx-2 my-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default UserProfile;
