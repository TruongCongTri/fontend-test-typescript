"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search GitHub..."
        className="px-3 py-1 bg-black text-[#00ff88] border border-gray-600 rounded-sm focus:ring-2 ring-[#00ff88]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className={`px-3 py-1 bg-black text-white border border-gray-600 rounded-sm ${
          !query.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Search
      </button>
    </div>
  );
}
