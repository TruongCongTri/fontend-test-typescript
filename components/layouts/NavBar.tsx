/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import ProfileButton from "../buttons/ProfileButton";
import SearchInput from "../inputs/SearchInput";

type ParsedPhone = {
  nationalNumber: string;
  international: string;
  withoutPlus: string;
  country: string;
  countryCode: string;
};

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parsedPhone, setParsedPhone] = useState<ParsedPhone | null>(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phone_number");
    const phoneData = localStorage.getItem("phone_data");
    const auth = getCookie("auth");
    setIsAuthenticated(!!phoneNumber && !!phoneData && auth === "true");
    if (isAuthenticated && phoneNumber && phoneData) {
      try {
        const parsed = JSON.parse(phoneData);
        setParsedPhone(parsed);
      } catch (error) {
        console.error("Failed to parse phone data", error);
      }
    }
  }, [isAuthenticated]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex justify-between items-center p-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
        {/* Left section: logo */}
        <div className="text-xl font-bold text-white">
          <Link href="/">
            <span className="text-xl font-bold">Github Search</span>
          </Link>
        </div>
        {/* Center section: SearchInput aligned like LayoutWrapper */}
        {isAuthenticated && (
          <div className="w-full sm:w-auto sm:flex-1">
            <div className="sm:pl-20 sm:max-w-xl sm:mx-auto">
              <SearchInput />
            </div>
          </div>
        )}
        {/* Right section: login or profile/logout */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <>
              {parsedPhone && (
                <ProfileButton
                  country={parsedPhone.country}
                  countryCode={parsedPhone.countryCode}
                  nationalNumber={parsedPhone.nationalNumber}
                />
              )}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
