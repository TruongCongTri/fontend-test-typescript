"use client";

import React, { useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
};

export default function OTPInput({
  value,
  onChange,
  length = 6,
  disabled = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    const cleanChar = char.replace(/[^0-9]/g, "");
    if (!cleanChar && !value[index]) return;

    const updated = value.split("");
    updated[index] = cleanChar;
    const joined = updated.join("");
    onChange(joined);

    if (cleanChar && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between max-w-xl mx-auto mt-1 mb-4">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-9 text-center border border-gray-500 bg-black text-[#00ff88] rounded-sm focus:ring-2 ring-[#00ff88] outline-none"
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
