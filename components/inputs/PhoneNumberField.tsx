"use client";
import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function PhoneNumberField({ value, onChange, disabled }: Props) {
  return (
    <div className="w-full">
      <PhoneInput
        defaultCountry="VN"
        international
        value={value}
        onChange={(val) => onChange(val || "")}
        disabled={disabled}
        className="react-phone-number-input mt-1 mb-4"
        placeholder="Enter phone number"
      />
    </div>
  );
}
