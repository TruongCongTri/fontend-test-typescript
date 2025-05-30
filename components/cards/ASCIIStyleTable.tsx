"use client";

import React from "react";
import Link from "next/link";
import { GithubAPI } from "@/types/api";
import LikeButton from "../buttons/LikeButton";

interface Props {
  users: GithubAPI.GithubUser[];
}

export default function CardList({ users }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-700 rounded bg-black text-[#00ff88] font-mono text-sm">
      <table className="w-full table-fixed border-separate border-spacing-0">
        <thead>
          <tr>
            <td colSpan={5}>
              <div className="px-2">+------------+---------+--------+-----------+-----+</div>
            </td>
          </tr>
          <tr className="text-white">
            <th className="px-2 py-1 text-left">| Login</th>
            <th className="px-2 py-1 text-left">Profile</th>
            <th className="px-2 py-1 text-left">Repos</th>
            <th className="px-2 py-1 text-left">Followers</th>
            <th className="px-2 py-1 text-left">♥ |</th>
          </tr>
          <tr>
            <td colSpan={5}>
              <div className="px-2">+------------+---------+--------+-----------+-----+</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-900 transition">
              <td className="px-2 py-1 whitespace-nowrap overflow-hidden truncate w-[120px]">
                | {user.login}
              </td>
              <td className="px-2 py-1">
                <Link
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View
                </Link>
              </td>
              <td className="px-2 py-1">
                <Link
                  href={user.repos_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Repos
                </Link>
              </td>
              <td className="px-2 py-1">{user.followers}</td>
              <td className="px-2 py-1">
                <LikeButton githubUserId={user.id} />
                {" |"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div className="px-2">+------------+---------+--------+-----------+-----+</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
