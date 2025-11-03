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
        <div className="z-10">
          {/* Logo */}
          <div className="">
            <p className=" text-xl font-semibold">AuraMarket</p>
          </div>

          <div className="mt-40 px-8">
            <h1 className="text-4xl font-bold mb-5">Just Do It</h1>
            <p className="text-gray-300 text-lg leading-relaxed w-3/4">
              Join millions of Shoppers who trust AuraMarket for their Shopping
              needs.
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm z-10">
          © 2025 AuraMarket. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white w-1/2 flex justify-center items-center relative">
        <div className="w-[420px]">
          <p className="text-center text-gray-600 text-sm font-light">
            Already have an account?{" "}
            <Link href="/signin" className="link link-hover font-bold underline text-black">
              Sign In
            </Link>
          </p>

          <h2 className="text-3xl font-bold mt-6 mb-2">
            Join AuraMarket Today!
          </h2>
          <p className="text-gray-500 mb-6">
            Create your account to start your Shopping journey
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button className="btn btn-outline w-full gap-2 rounded-full">
              <span><Image src="/google.svg" className="text-red" alt="google" width={16} height={16} /></span> Continue with Google
            </button>
          </div>

          <div className="divider divider-neutral text-sm font-light text-gray-800">
            Or sign up with
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="bg-white input input-neutral w-full rounded-xl"
              />
            </div>

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
              Sign Up
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-5 text-center">
            By signing up, you agree to our{" "}
            <span className="link link-hover font-medium">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="link link-hover font-medium">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
