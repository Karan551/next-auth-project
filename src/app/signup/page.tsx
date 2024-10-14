"use client";
import Link from "next/link";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUpPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_pwd: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const router = useRouter();



  const handleSignUp = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const url = "/api/users/signup/";

      if (PWD_REGEX.test(user.password)) {
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
            confirm_pwd: "",
          });

          // redirect to login route
          router.push("/login/");
        }
      }
    } catch (error: any) {
      setLoading(false);

      toast.error(`${error.response.data.error}.`, {
        duration: 3000,
        position: "top-center",
        className: "text-xl font-semibold w-full px-4",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });

      console.log("Error in Signup::", error.response.data.error);
      setErrorMsg(error.response.data.error);
      errorRef.current?.focus();

      setUser({
        ...user,
        email: "",
        password: "",
        confirm_pwd: "",
      });
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

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(user.password));
    setValidConfirmPwd(user.password == user.confirm_pwd);
  }, [user.password, user.confirm_pwd]);

  if (loading)
    return (
      <div className="grid place-content-center text-3xl text-center rounded-lg p-2 min-h-screen">
        <div className="text-5xl">Loading....</div>
        <div className="loading mx-auto mt-4"></div>
      </div>
    );

  /*
  if (errorMsg)
    return (
      <div className=" grid place-content-center min-h-screen">
        <div className="text-4xl font-semibold text-center rounded-lg p-4 w-full  bg-red-500 text-white ">
          Error {errorMsg}
        </div>
      </div>
    ); 
  */

  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-screen px-4 py-2">
        <form
          className="flex flex-col my-3 bg-white  w-1/2 p-4 rounded-lg text-black border-black border "
          method="post"
          onSubmit={handleSignUp}
        >
          {/* To show error Message */}
          <p
            ref={errorRef}
            className={
              errorMsg
                ? " text-2xl rounded-lg p-4 w-full  textwhite font-semibold text-white bg-red-400  mb-2 focus:border-black focus:text-3xl flex justify-between"
                : "absolute left-[99999px]"
            }
            aria-live="assertive"
          >
            <span>{errorMsg}</span>
            <FaTimesCircle
              onClick={() => setErrorMsg("")}
              className="cursor-pointer "
            />
          </p>

          <h1 className="text-4xl text-center font-semibold">Signup</h1>

          <label htmlFor="username" className="text-3xl my-2">
            Username :-
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={userRef}
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

          <label htmlFor="password" className="text-3xl  my-2 space-x-4 flex">
            Password :-
            <FaCheck
              className={
                validPwd ? "text-green-500 ml-[6px] mt-[4px]" : "hidden"
              }
            />
            <FaTimes
              className={
                validPwd || !user.password
                  ? "hidden"
                  : "!ml-[2px] mt-[6px] text-red-500"
              }
            />
          </label>

          <input
            type="password"
            name="password"
            id="password"
            required
            aria-invalid={!validPwd ? "true" : "false"}
            aria-describedby="pwdNote"
            placeholder="Enter Your Password...."
            className="placeholder:text-gray-300 inline-block mb-4 rounded-lg text-2xl outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600 border border-black"
            autoComplete="current-password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdNote"
            className={
              pwdFocus && !validPwd
                ? "text-base border-2 bg-gray-200  p-2 rounded-lg border-black text-black"
                : "absolute left-[9999px]"
            }
          >
            {" "}
            <FaInfoCircle className="inline-block text-xl w-6 h-6 mr-2" />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          {/* ---- */}
          <label
            htmlFor="confirm_pwd"
            className="text-3xl  my-2 space-x-4 flex"
          >
            Confirm Password :-
            <FaCheck
              className={
                validConfirmPwd && user.confirm_pwd
                  ? "text-green-500 ml-[6px] mt-[4px] "
                  : "hidden"
              }
            />
            <FaTimes
              className={
                validConfirmPwd || !user.confirm_pwd
                  ? "hidden"
                  : "ml-[5px] mt-[6px] text-red-500"
              }
            />
          </label>

          <input
            type="password"
            name="confirm_pwd"
            id="confirm_pwd"
            required
            aria-invalid={validConfirmPwd ? "false" : "true"}
            aria-describedby="confirmNote"
            placeholder="Confirm Your Password...."
            className="placeholder:text-gray-300 inline-block mb-4 rounded-lg text-2xl outline-none px-4 py-2 focus:ring-1 focus:ring-indigo-600 border border-black"
            autoComplete="current-password"
            value={user.confirm_pwd}
            onChange={(e) => setUser({ ...user, confirm_pwd: e.target.value })}
            onFocus={() => setConfirmPwdFocus(true)}
            onBlur={() => setConfirmPwdFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              confirmPwdFocus && !validConfirmPwd
                ? "text-base border-2 bg-gray-200  p-2 rounded-lg border-black text-black"
                : "absolute left-[9999px]"
            }
          >
            <FaInfoCircle className="inline-block text-xl w-6 h-6 mr-2" />
            Must match the first password input field.
          </p>

          <button
            className="inline-block text-3xl font-semibold rounded-lg px-4 py-2 w-3/4 text-white self-center my-3 bg-sky-500 hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-700/60 disabled:text-black/30"
            disabled={btnDisabled || !validPwd}
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
