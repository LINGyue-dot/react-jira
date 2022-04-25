/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-14 19:21:33
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-18 22:03:21
 * @Description:
 */

import { FormEvent, FormEventHandler } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`);
  };

  const hanleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
  };
  return (
    <form onSubmit={hanleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
