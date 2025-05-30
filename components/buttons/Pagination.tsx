"use client";

import { GithubAPI } from "@/types/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  meta: GithubAPI.Pagination;
}

export default function Pagination({ meta }: PaginationProps) {
  const { current_page, per_page, total_pages } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value;
    router.push(`?q=${q}&page=1&per_page=${newPerPage}`);
  };

  const createPageLink = (page: number) =>
    `?q=${q}&page=${page}&per_page=${per_page}&}`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 font-mono w-full">
      <div className="flex items-center gap-2">
        <label htmlFor="perPageSelect" className="text-white">
          Results per page:
        </label>
        <select
          id="perPageSelect"
          value={per_page}
          onChange={handlePerPageChange}
          className="bg-black border border-white text-[#00ff88] px-2 py-1 rounded-sm"
        >
          {[5, 10, 20, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        {current_page > 1 && (
          <Link
            href={createPageLink(current_page - 1)}
            className="text-[#00ff88] hover:underline"
          >
            &lt; Prev
          </Link>
        )}

        <span className="text-white">
          Page {current_page} of {total_pages}
        </span>

        {current_page < total_pages && (
          <Link
            href={createPageLink(current_page + 1)}
            className="text-[#00ff88] hover:underline"
          >
            Next &gt;
          </Link>
        )}
      </div>
    </div>
  );
}
