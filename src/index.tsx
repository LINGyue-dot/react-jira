/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-09 21:30:12
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-30 16:30:05
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { loadDevTools } from "jira-dev-tool";
import AppContext from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
