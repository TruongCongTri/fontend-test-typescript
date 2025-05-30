// libs/githubAPI.ts
import axios from "axios";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GetGithubUsersParams {
  q: string;
  page: number;
  per_page: number;
}

interface Pagination {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export const getGithubUsers = async ({
  q,
  page,
  per_page,
}: GetGithubUsersParams): Promise<{
  users: GitHubUser[];
  pagination: Pagination;
}> => {
  try {
    const { data } = await axios.get("https://api.github.com/search/users", {
      params: { q, page, per_page },
    });

    const total = data.total_count;
    const total_pages = Math.ceil(total / per_page);

    const users = data.items.map((user: any) => ({
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));

    return {
      users,
      pagination: {
        current_page: page,
        per_page,
        total,
        total_pages,
      },
    };
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    return {
      users: [],
      pagination: {
        current_page: page,
        per_page,
        total: 0,
        total_pages: 0,
      },
    };
  }
};
