/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-09 21:30:12
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:39:47
 * @Description:
 */
import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import AuthenticatedApp from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
