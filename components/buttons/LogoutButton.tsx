"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication cookie
    deleteCookie("auth");
    // Clear any other client-side data if necessary
    localStorage.removeItem("phone_number");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white border border-gray-600 px-3 py-1 rounded-sm outline-none hover:bg-gray-800"
    >
      Logout
    </button>
  );
}
