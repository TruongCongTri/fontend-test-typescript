import React from "react";
import { GithubAPI } from "@/types/api";
import LikeButton from "../buttons/LikeButton";
import Link from "next/link";

interface Props {
  user: GithubAPI.GithubUser;
}

export default function Card({ user }: Props) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800">
      <td className="py-2 px-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        <img
          src={user.avatar_url}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </td>
      <td className="py-2 px-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        {user.login}
      </td>
      <td className="py-2 px-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        <Link
          href={user.html_url}
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 underline"
        >
          View
        </Link>
      </td>
      <td className="py-2 px-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        <Link
          href={user.repos_url}
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400 underline"
        >
          Repos
        </Link>
      </td>
      <td className="py-2 px-2 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        {user.followers}
      </td>
      <td className="py-2 px-4 truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        <LikeButton githubUserId={user.id} />
      </td>
    </tr>
  );
}
