"use client";
import React, { Suspense, useEffect, useState } from "react";
import MyOrders from "@/components/myOrders";
import Favourites from "@/components/Favourites";
import Image from "next/image";
import UserDetails from "@/components/UserDetails";
import Address from "@/components/Address";
import { useSearchParams } from 'next/navigation';
import { userInfo } from "@/utills/user";
import Link from "next/link";
export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading profile...</div>}>
      <ProfilePageContent />
    </Suspense>
  );
}

function ProfilePageContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'My Orders';
  const [activeTab, setActiveTab] = useState(currentTab);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await userInfo();
        // const orders= await getOrders()
        // console.log(data)
        if (!isMounted) return;
        if (data?.login === false) {
          setNeedsLogin(true);
          setUser(null);
          return;
        }
        if (data?.success && data?.user) {
          setUser(data.user);
          setNeedsLogin(false);
        } else {
          setError(data?.message || "Could not fetch your profile details.");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err?.message || "Something went wrong while loading your profile.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="p-6 flex justify-center items-center pt-22">
      <span className="loading loading-dots loading-xl" />
    </div>;
  }

  if (error && !needsLogin) {
    return (
      <div className="p-6 text-center text-red-500 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg font-semibold">{error}</p>
        <p className="text-sm text-gray-500 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  if (!user || needsLogin) {
    return (
      <div className="p-6 text-center pt-22">
        <h2 className="text-xl font-semibold mb-2">Please log in</h2>
        <p className="text-gray-600">You need to be signed in to view your profile.</p>
        <Link href="/signin" className="btn btn-neutral mt-4">Sign In</Link>
      </div>
    );
  }

  const tabs = [
    "My Orders",
    "Favorites",
    "My Details",
    "Address Book",
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl pt-22">
      <div className="flex items-center gap-6 mb-10">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image src="profile.svg" alt="profile-pic" width={48} height={48} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="border-b border-base-300 mb-8 overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-4 text-sm font-semibold transition-colors relative ${activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "My Orders" && (
          <MyOrders orders={user.orders} />
        )}

        {activeTab === "Favorites" && (
          <Favourites favorites={user.favourites} />
        )}

        {activeTab === "My Details" && (
          <UserDetails user={{ name: user.name, email: user.email, id: user.id }} />
        )}

        {activeTab === "Address Book" && (
          <Address addresses={user.addresses} />
        )}

      </div>
    </div>
  );
}
