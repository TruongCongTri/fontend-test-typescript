"use client";

import { useEffect, useState } from "react";
import { likeGithubUser, getLikedGithub } from "@/libs/apiFunction";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
  githubUserId: number;
}

export default function LikeButton({ githubUserId }: LikeButtonProps) {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("phone_number");
    if (!stored) return;

    setPhoneNumber(stored);

    getLikedGithub(stored)
      .then((res) => {
        const likedIds = res.data.favorite_github_ids;
        if (likedIds.includes(githubUserId)) {
          setLiked(true);
        }
      })
      .catch(() => toast.error("Failed to fetch liked users."))
      .finally(() => setLoading(false));
  }, [githubUserId]);

  const handleLike = async () => {
    if (!phoneNumber || liked) return;

    try {
      setSubmitting(true);
      await likeGithubUser({
        phone_number: phoneNumber,
        github_user_id: githubUserId,
      });
      setLiked(true);
      toast.success(`Liked!`, {
        icon: "❤️",
      });
    } catch {
      toast.error(`Failed to like user`, {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div
      onClick={handleLike}
      className={`text-xl  ${
        liked || submitting
          ? "cursor-not-allowed"
          : "cursor-pointer hover:scale-110 transition-transform"
      })
      }`}
      title={liked ? "Liked" : "Like"}
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="red"
          viewBox="0 0 24 24"
          stroke="red"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 015.656 5.656L12 21 3.172 10.828a4 4 0 010-5.656z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 015.656 5.656L12 21 3.172 10.828a4 4 0 010-5.656z"
          />
        </svg>
      )}
    </div>
  );
}
