/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-30 16:37:46
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:37:46
 * @Description:
 */

import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "pages/project-list";

const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};

export default AuthenticatedApp;
