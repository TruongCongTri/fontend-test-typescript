"use client";

import React from "react";

interface Props {
  phoneData: {
    nationalNumber: string;
    international: string;
    withoutPlus: string;
    country: string;
    countryCode: string;
  };
}

export default function PhoneDataTable({ phoneData }: Props) {
  const rows = [
    ["Field", "Value"],
    ["country", phoneData.country],
    ["countryCode", `+${phoneData.countryCode}`],
    ["nationalNumber", `0${phoneData.nationalNumber}`],
    ["international", phoneData.international],
    ["withoutPlus", phoneData.withoutPlus],
  ];

  const formatRow = (col1: string, col2: string) => {
    const pad = (text: string, len: number) =>
      text.length > len ? text.slice(0, len) : text.padEnd(len, " ");
    return `| ${pad(col1, 15)} | ${pad(col2, 35)} |`;
  };

  return (
    <pre className="text-[#00ff88] font-mono text-sm overflow-x-auto">
      {`+-----------------+-------------------------------------+`}
      {`\n${formatRow("Field", "Value")}`}
      {`\n+-----------------+-------------------------------------+`}
      {rows
        .slice(1)
        .map(([key, value]) => `\n${formatRow(key, value)}`)
        .join("")}
      {`\n+-----------------+-------------------------------------+`}
    </pre>
  );
}
