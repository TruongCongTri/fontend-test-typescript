import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] pt-20 bg-black text-terminalGreen font-mono flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-4xl mb-4">404</h1>
      <p className="text-xl mb-6"> Command not found</p>
      <Link
        href="/"
        className="text-terminalGreen underline hover:text-white transition"
      >
        Return to home
      </Link>
    </div>
  );
}
