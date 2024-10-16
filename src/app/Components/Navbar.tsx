"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png"
            className="h-12"
            alt="Auth Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white text-blue-500">
            Auth
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium text-2xl flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3  rounded   md:p-0 dark:text-white 
                  md:hover:text-blue-700
                  md:dark:text-blue-500 
                  ${pathName === "/" ? "md:text-blue-700 text-white bg-blue-700" : ""}  md:bg-transparent`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={` block py-2 px-3 text-gray-900 rounded hover:bg-gray100 
                md:hover:bg-transparent md:border-0
                 ${pathName === "/signup" ? "md:text-blue-700 text-white bg-blue-700" : ""} md:bg-transparent 
                  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`block py-2 px-3 text-gray-900 rounded
                
              md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
                
                  ${pathName === "/login" ? "md:text-blue-700 text-white bg-blue-700" : ""} md:bg-transparent 
                `}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
