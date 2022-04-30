/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 15:58:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 17:41:49
 * @Description:
 */

import { User } from "pages/project-list/search-panel";
import React, { useState } from "react";
import { useMount } from "utils";

import * as auth from "utils/auth-provider";
import { http } from "utils/http";

interface AuthFrom {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthFrom) => Promise<void>;
      register: (form: AuthFrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

// 通过 token 进行初始化 user 状态
export const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// tsx 组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthFrom) => auth.login(form).then(setUser);
  const register = (form: AuthFrom) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    boostrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{
        user,
        login,
        logout,
        register,
      }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 并未在 Provider 中使用");
  }
  return context;
};
