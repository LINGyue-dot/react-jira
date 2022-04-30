/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 16:48:40
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 17:26:00
 * @Description: 对 http 请求进行封装，主要包括 baseUrl、数据携带、header、token 携带、response 的异常辅助处理、发送携带 token 的请求以及不携带 token 的请求
 *
 * 只有断网等特殊情况发生时候 fetch catch 才会触发，普通的 401 500 并不会
 * 所以在 response.ok == false 时候需要手动抛出异常
 *
 * 而 axios 在 401 / 500 时候就可以通过 catch 来进行直接捕获
 */

import * as auth from "utils/auth-provider";
import qs from "qs";
import { useAuth } from "context/auth-context";
interface Config extends RequestInit {
  token?: string | null;
  data?: any;
}

const apiUrl = process.env.REACT_APP_API_URL;

export const http = (
  endpoint: string,
  { token, data, method, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: method?.toUpperCase() || "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  // params 形式携带参数
  if (config.method == "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //? fetch 兼容性处理
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 401 权限问题
      if (response.status == 401) {
        // 推出登录
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// 权限控制的 http 请求 hook
// 实现携带 token 的 http 请求
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
