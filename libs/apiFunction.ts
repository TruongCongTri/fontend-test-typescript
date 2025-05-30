import API from "./api";
import { API_ENDPOINTS } from "./endpoints";
import { AuthAPI, GithubAPI, UserAPI } from "@/types/api";

// AUTH
export const createAccessCode = (payload: AuthAPI.CreateCodePayload) =>
  API.post(API_ENDPOINTS.AUTH.CREATE_CODE, payload);

export const validateAccessCode = (payload: AuthAPI.ValidateCodePayload) =>
  API.post<AuthAPI.ValidateCodeResponse>(
    API_ENDPOINTS.AUTH.VALIDATE_CODE,
    payload
  );

// GITHUB
export const searchGithubUsers = (params: GithubAPI.SearchParams) =>
  API.get<GithubAPI.SearchResponse>(API_ENDPOINTS.GITHUB.SEARCH_USERS, {
    params,
  });

export const findGithubUserProfile = (id: number) =>
  API.get<GithubAPI.GithubUser>(API_ENDPOINTS.GITHUB.USER_PROFILE, {
    params: { github_user_id: id },
  });

// USER
export const likeGithubUser = (payload: UserAPI.LikeGithubUserPayload) =>
  API.post(API_ENDPOINTS.USER.LIKE_GITHUB_USER, payload);

export const getUserProfile = (phone_number: string) =>
  API.get<UserAPI.GetUserProfileResponse>(API_ENDPOINTS.USER.GET_USER_PROFILE, {
    params: { phone_number },
  });
export const getLikedGithub = (phone_number: string) =>
  API.get<UserAPI.LikedPayload>(API_ENDPOINTS.USER.GET_LIKED_GITHUB, {
    params: { phone_number },
  });
