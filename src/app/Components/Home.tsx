import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="bg-center bg-no-repeat bg-[url('https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_960_720.jpg')] bg-gray-200/80 bg-blend-multiply w-full bg-cover">
  <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
      We invest in the world's potential
    </h1>
    <p className="mb-8 text-lg  text-gray-50 font-semibold lg:text-xl sm:px-16 lg:px-48">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quia obcaecati alias voluptate vero dicta possimus quisquam adipisci sequi id ducimus assumenda perspiciatis laboriosam dolor fugit, culpa iusto quibusdam cumque!
    </p>
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
      <Link
        href="/signup"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Get started
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
      <Link
        href="/login"
        className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
      >
        Learn more
      </Link>
    </div>
  </div>
</section>

  )
}
