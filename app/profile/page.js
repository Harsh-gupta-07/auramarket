"use client";
import React, { useState } from "react";
import MyOrders from "@/components/myOrders";
import Favourites from "@/components/Favourites";
import Image from "next/image";
import UserDetails from "@/components/UserDetails";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Orders");

  const user = {
    name: "Ronald O. Williams",
    email: "ronald@mail.com",
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", // Placeholder
  };

  const tabs = [
    "My Orders",
    "Favorites",
    "My Details",
    "Payment Methods",
    "Address Book",
  ];





  return (
    <div className="container mx-auto p-6 max-w-5xl pt-22">
      {/* Profile Header */}
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

      {/* Tabs */}
      <div className="border-b border-base-300 mb-8 overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === "My Orders" && (
          <MyOrders />
        )}

        {activeTab === "Favorites" && (
          <Favourites />
        )}

        {activeTab === "My Details" && (
          <UserDetails />
        )}
        
        {/* Placeholders for other tabs */}
        {[ "Payment Methods", "Address Book"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <p>Content for {activeTab} is not implemented yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
