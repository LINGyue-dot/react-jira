/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 15:58:43
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:16:35
 * @Description:
 */

import { User } from "pages/project-list/search-panel";
import React, { useState } from "react";

import * as auth from "utils/auth-provider";

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

// tsx 组件
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthFrom) => auth.login(form).then(setUser);
  const register = (form: AuthFrom) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

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
