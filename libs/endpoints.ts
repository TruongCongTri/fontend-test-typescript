const BASE = "/api";

export const API_ENDPOINTS = {
  AUTH: {
    /** POST: Generate and send access code */
    CREATE_CODE: `${BASE}/auth/create-code`,

    /** POST: Validate access code and phone number */
    VALIDATE_CODE: `${BASE}/auth/validate-code`,
  },

  GITHUB: {
    /** GET: Search GitHub users with q, page, per_page */
    SEARCH_USERS: `${BASE}/github/search`,

    /** GET: Get GitHub profile details by ID */
    USER_PROFILE: `${BASE}/github/user-profile`,
  },

  USER: {
    /** POST: Like a GitHub user profile */
    LIKE_GITHUB_USER: `${BASE}/user/like-github-user`,

    /** GET: Get user profile and their liked GitHub users */
    GET_USER_PROFILE: `${BASE}/user/profile`,

    /** GET: Get liked GitHub users */
    GET_LIKED_GITHUB: `${BASE}/user/profile/liked-github`,
  },
};
