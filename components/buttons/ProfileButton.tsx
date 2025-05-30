"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  country: string;
  countryCode: string;
  nationalNumber: string;
};
export default function ProfileButton({
  country,
  countryCode,
  nationalNumber,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`}
        alt={`${country} flag`}
        width={24}
        height={18}
      />
      <span className="text-sm text-gray-300 hover:underline">
        +{countryCode} - 0{nationalNumber}
      </span>
    </div>
  );
}
