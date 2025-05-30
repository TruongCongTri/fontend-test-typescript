"use client";

import { useState, useEffect } from "react";

import { GithubAPI } from "@/types/api";
import CardList from "../cards/CardList";
import PhoneDataTable from "../cards/PhoneDataTable";

interface Props {
  users: GithubAPI.GithubUser[];
}

export default function DashboardTabs({ users }: Props) {
  const [activeTab, setActiveTab] = useState<"phone" | "github">("phone");
  const [phoneData, setPhoneData] = useState<null | {
    nationalNumber: string;
    international: string;
    withoutPlus: string;
    country: string;
    countryCode: string;
  }>(null);

  useEffect(() => {
    const stored = localStorage.getItem("phone_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPhoneData(parsed);
      } catch (err) {
        console.error("Failed to parse phone_data:", err);
      }
    }
  }, []);

  return (
    <div className="mt-4">
      <div className="flex gap-4 text-sm font-mono text-white mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("phone")}
          className={`px-3 py-1 ${
            activeTab === "phone"
              ? "text-[#00ff88] border-b-2 border-[#00ff88]"
              : "text-gray-400 hover:text-[#00ff88]"
          }`}
        >
          Phone Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("github")}
          className={`px-3 py-1 ${
            activeTab === "github"
              ? "text-[#00ff88] border-b-2 border-[#00ff88]"
              : "text-gray-400 hover:text-[#00ff88]"
          }`}
        >
          GitHub Profiles
        </button>
      </div>

      {activeTab === "phone" ? (
        phoneData ? (
          <PhoneDataTable phoneData={phoneData} />
        ) : (
          <p className="text-white">No phone data available.</p>
        )
      ) : (
        <CardList users={users} />
      )}
    </div>
  );
}
