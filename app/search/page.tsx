import React from "react";
import { searchGithubUsers } from "@/libs/apiFunction";
import CardList from "@/components/cards/CardList";
import Pagination from "@/components/buttons/Pagination";
import { GithubAPI } from "@/types/api";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";

interface SearchPageProps {
  searchParams: {
    q: string;
    page?: string;
    per_page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page = "1", per_page = "10" } = await searchParams;

  if (!q) {
    return (
      <LayoutWrapper>
        <Breadcrumb />
        <p className="mb-2 text-sm text-gray-400">
          Please enter a search term.
        </p>
      </LayoutWrapper>
    );
  }

  let data: GithubAPI.SearchResponse | null = null;
  let error: string | null = null;

  try {
    const response = await searchGithubUsers({
      q,
      page: Number(page),
      per_page: Number(per_page),
    });
    data = response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Something went wrong while fetching GitHub users.";
    }
  }

  return (
    <LayoutWrapper>
      <Breadcrumb />
      {q && (
        <p className="mb-2 text-sm text-gray-400">
          Showing results for: <strong>{q}</strong>
        </p>
      )}
      {error && <p className="text-red-400 mb-4">❌ {error}</p>}

      {data ? (
        <div>
          <CardList users={data.data.users} />
          <Pagination meta={data.meta.pagination} />
        </div>
      ) : (
        !error && <p className="text-[#00ff88]">Loading...</p>
      )}
    </LayoutWrapper>
  );
}
