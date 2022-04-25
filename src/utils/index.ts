/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2022-04-14 19:36:35
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2022-04-25 15:52:33
 * @Description:
 */

import { useEffect, useState } from "react";

export const useMount = (cb: () => any) => {
  useEffect(() => {
    cb();
  }, []);
};

/**
 * 传入 input 的内容，传出节流的数据
 * 在 input 时候监听节流出的数据，当节流的数据变化时候就发起请求
 * @use const debounceValue = useDebounce(inputValue,delay)
 * useEffcet(()=>{ fetchApi() // 监听节流后的数据进行请求数据},[debounceValue])
 * @param value input 内的内容
 * @param delay 节流
 */
export const useDebounce = <V>(value: V, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
