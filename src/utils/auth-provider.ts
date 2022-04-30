/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 15:50:38
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:09:04
 * @Description: 权限认证 token 操作封装
 * 包括登录、注册、登出
 */

import { User } from "pages/project-list/search-panel";

const localStorgaeKey = "__auth_provider_token__";

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorgaeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorgaeKey, user.token || "");
  return user;
};

export const login = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      //
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response);
    }
  });
};

export const register = (param: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(response);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorgaeKey);
