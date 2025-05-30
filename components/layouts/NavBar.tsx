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
    // "p-6 max-w-xl mx-auto"
    <nav className="flex justify-between items-center p-4 border-b border-gray-700">
      {/* Left section: logo */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl font-bold">Github Search</span>
        </Link>
      </div>
      {/* Center section: SearchInput aligned like LayoutWrapper */}
      {isAuthenticated && (
        <div className="flex-1">
          <div className="pl-20 max-w-xl mx-auto">
            <SearchInput />
          </div>
        </div>
      )}
      {/* Right section: login or profile/logout */}
      <div className="flex items-center space-x-4">
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
    </nav>
  );
}
