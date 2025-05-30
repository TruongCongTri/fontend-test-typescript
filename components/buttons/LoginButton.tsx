import Link from "next/link";
import React from "react";

export default function LoginButton() {
  return (
    <Link href="/login">
      <button className="bg-black text-white border border-gray-600 px-3 py-1 rounded-sm outline-none hover:bg-gray-800">
        Login
      </button>
    </Link>
  );
}
