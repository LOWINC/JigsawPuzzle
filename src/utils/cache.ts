import {useEffect, useState,} from "react";

export function useCache<T>(dragArr: T[]) {
  const [data, setData] = useState<T[]>([]);

  function getCache() {
    try {
      const data: any = localStorage.getItem("cache-data") || "[]";
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  function clear() {
    localStorage.setItem("cache-data", JSON.stringify([]));
    setData([]);
  }

  useEffect(() => {
    const data = getCache();
    console.log("data:", data);
    setData(data);
  }, []);

  useEffect(() => {
    if (dragArr.length === 0) {
      return;
    }
    localStorage.setItem("cache-data", JSON.stringify(dragArr));
  }, [dragArr]);

  return {
    data,
    clear,
  };
}
