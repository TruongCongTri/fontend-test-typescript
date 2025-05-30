/* eslint-disable @typescript-eslint/no-namespace */
export namespace AuthAPI {
  export interface CreateCodePayload {
    phone_number: string;
  }

  export interface ValidateCodePayload {
    phone_number: string;
    access_code: string;
  }

  export interface ValidateCodeResponse {
    meta: {
      success: boolean;
      message: string;
    };
  }
}

export namespace GithubAPI {
  export interface SearchParams {
    q: string;
    page?: number;
    per_page?: number;
  }

  export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    repos_url: string;
    followers: number;
  }
  export interface Pagination {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }

  export interface SearchResponse {
    data: {
      users: GithubUser[];
    };
    meta: {
      pagination: Pagination;
      success: boolean;
      message: string;
    };
  }
}

export namespace UserAPI {
  export interface LikeGithubUserPayload {
    phone_number: string;
    github_user_id: number;
  }
  export interface LikedPayload {
    phone_number: string;
    favorite_github_ids: number[];
  }
  export interface UserProfile {
    phone_number: string;
    favorite_github_users: GithubAPI.GithubUser[];
  }
  export interface GetLikeGithubResponse {
    data: {
      user: LikedPayload;
    };
    meta: {
      success: boolean;
      message: string;
    };
  }
  export interface GetUserProfileResponse {
    data: {
      user: UserProfile;
    };
    meta: {
      success: boolean;
      message: string;
    };
  }
}
