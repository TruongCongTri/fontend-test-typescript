"use client";

import React from "react";
import { GithubAPI } from "@/types/api";
import LikeButton from "../buttons/LikeButton";

interface Props {
  users: GithubAPI.GithubUser[];
}

const COLUMN_WIDTHS = [12, 14, 10, 10, 10, 6]; // for spacing consistency

const pad = (text: string, length: number) =>
  text.length > length
    ? text.slice(0, length - 1) + "…"
    : text.padEnd(length, " ");

export default function ASCIIStyleCardList({ users }: Props) {
  const renderRow = (
    login: string,
    html_url: string,
    repos_url: string,
    followers: number,
    id: number
  ) => {
    return `| ${pad(login, COLUMN_WIDTHS[1])} | ${pad(
      "View",
      COLUMN_WIDTHS[2]
    )} | ${pad("Repos", COLUMN_WIDTHS[3])} | ${pad(
      String(followers),
      COLUMN_WIDTHS[4]
    )} | ${pad("❤️", COLUMN_WIDTHS[5])} |`;
  };

  const header = `| ${pad("Login", COLUMN_WIDTHS[1])} | ${pad(
    "Profile",
    COLUMN_WIDTHS[2]
  )} | ${pad("Repos", COLUMN_WIDTHS[3])} | ${pad(
    "Followers",
    COLUMN_WIDTHS[4]
  )} | ${pad("♥", COLUMN_WIDTHS[5])} |`;

  const border =
    "+" + COLUMN_WIDTHS.map((w) => "-".repeat(w + 2)).join("+") + "+";

  return (
    <pre className="font-mono text-[#00ff88] text-sm overflow-x-auto whitespace-pre">
      {border}
      {"\n" + header}
      {"\n" + border}
      {users
        .map((user) =>
          renderRow(
            user.login,
            user.html_url,
            user.repos_url,
            user.followers,
            user.id
          )
        )
        .join("\n")}
      {"\n" + border}
    </pre>
  );
}
