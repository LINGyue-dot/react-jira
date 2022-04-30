/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 15:58:32
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:18:47
 * @Description:
 */

import React from "react";
import { AuthProvider } from "./auth-context";

const AppContext = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppContext;
