/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 15:50:38
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 17:39:07
 * @Description: 权限认证 token 操作封装
 * 包括登录、注册、登出
 */

import { User } from "pages/project-list/search-panel";
import { http } from "./http";

const localStorgaeKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorgaeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorgaeKey, user.token || "");
  return user;
};

export const login = (params: { username: string; password: string }) => {
  return http("login", {
    method: "POST",
    data: params,
  }).then(async (response) => handleUserResponse(response));
};

export const register = (params: { username: string; password: string }) => {
  return http("register", {
    method: "POST",
    data: params,
  }).then(async (response) => handleUserResponse(response));
};

export const logout = async () =>
  window.localStorage.removeItem(localStorgaeKey);
