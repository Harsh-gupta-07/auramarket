"use client";
import Squares from "@/components/Squares";
import isStrongPassword from "@/utills/passwordValidator";
import { signup } from "@/utills/signup";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { redirect, RedirectType } from 'next/navigation'

export default function page() {
  const [error, setError] = useState("")
  const name = useRef("")
  const email = useRef("")
  const password = useRef("")
  const [load,setLoad] = useState(false)
  async function handle() {
    const refemail = email.current.value;
    const refpassword = password.current.value;
    const fullname = name.current.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!refemail || refemail.trim() == "" || !emailRegex.test(refemail)) {
      return setError("Please Enter a valid Email.");
    }
    if (!refpassword || refpassword.trim()) {
      const check = isStrongPassword(refpassword)
      if (!check.passed){
        return setError(check.msg)
      }
    }
    if (!fullname || fullname.trim()=="") {
      return setError("Name cannot be empty.");
    }
    setLoad(true)
    setError("")
    const res = await signup(fullname,refemail,refpassword)
    if (res.status=="failed"){
      setLoad(false)
      return setError(res.message)
    }
    setError("")
    localStorage.setItem("token",res.token)
    redirect("/",RedirectType.replace)
  }
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
            <Link
              href="/signin"
              className="link link-hover font-bold underline text-black"
            >
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
            Or sign up with
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                ref={name}
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
                ref={email}
                placeholder="johndoe@gmail.com"
                className="bg-white input input-neutral w-full rounded-xl"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="text"
                ref={password}
                placeholder="password"
                className="bg-white input input-neutral w-full rounded-xl"
              />
              <p className="text-xs text-gray-600 pt-2 p-1">Minimum 8 charcters including upper and lower case characters, numbers and speical characters.</p>
            </div>

            <div>
              {error ? (
                <span className="flex justify-center text-red-600 text-md">
                  <Image src="/error.svg" width={20} height={20} alt="error" />
                  {error}
                </span>
              ) : (
                ""
              )}
              {load ? (
                <button
                  className="btn bg-black text-white hover:bg-neutral-800 w-full mt-0 rounded-full"
                >
                  <span className="loading loading-spinner text-white"></span>
                </button>
              ) : (
                <button
                  onClick={handle}
                  className="btn bg-black text-white hover:bg-neutral-800 w-full mt-0 rounded-full"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>

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
