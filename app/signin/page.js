"use client";
import Squares from "@/components/Squares";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="absolute inset-0 z-0">
        <Squares />
      </div>
      <div className="w-1/2 bg-black text-white flex flex-col justify-between p-10">
        <div className="z-10 min-h-[40dvh] flex flex-col justify-between">
          {/* Logo */}
          <div>
            <p className="text-xl font-semibold">AuraMarket</p>
          </div>

          <div className="mt-40 px-8">
            <h1 className="text-4xl font-bold mb-5">Welcome Back</h1>
            <p className="text-gray-300 text-lg leading-relaxed w-3/4">
              Great Deals are waiting for you.
            </p>
          </div>
        </div>

        <p className="relative z-10 text-gray-400 text-sm">
          © 2025 AuraMarket. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white  w-1/2 flex justify-center items-center relative">
        <div className="w-[420px]">
          <p className="text-center text-gray-600 text-sm font-light">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="link link-hover font-bold underline text-black"
            >
              Sign Up
            </Link>
          </p>

          <h2 className="text-3xl text-center font-bold mt-3 mb-3">
            Welcome Back
          </h2>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="btn btn-outline w-full gap-2 rounded-full">
              <span>
                <Image
                  src="/google.svg"
                  className="text-red"
                  alt="google"
                  width={16}
                  height={16}
                />
              </span>{" "}
              Continue with Google
            </button>
          </div>

          <div className="divider divider-neutral text-sm font-light text-gray-800">
            Or sign in with
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="bg-white input input-neutral w-full rounded-xl"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="minimum 8 characters"
                className="bg-white input input-neutral w-full rounded-xl"
              />
            </div>

            <button className="btn bg-black text-white hover:bg-neutral-800 w-full mt-3 rounded-full">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
