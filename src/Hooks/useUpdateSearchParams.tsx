"use client";

import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const useUpdateSearchParams = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const updateSearchParams = (
    key: string,
    value: string | undefined,
    method: "set" | "delete" | "get",
    scroll?: boolean
  ): string | null | void => {
    const params = new URLSearchParams(searchParams.toString());

    if (method === "get") {
      return params.get(key); // reactive read
    }

    if (method === "delete") {
      params.delete(key);
    } else if (value !== undefined) {
      params.set(key, value);
    }

    const newUrl = `${location.pathname}?${params.toString()}`;

    // push instead of replace to allow history navigation
    navigate(newUrl);
  };

  const updateConcurrentSearchParams = (
    updates: {
      [key: string]: { method: "set" | "delete"; value?: string };
    },
    replace?: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, action]) => {
      if (action.method === "delete") {
        params.delete(key);
      } else if (action.method === "set" && action.value !== undefined) {
        params.set(key, action.value);
      }
    });

    const newSearch = params.toString();
    const newPath = `${location.pathname}${newSearch ? "?" + newSearch : ""}`;

    if (replace) {
      window.history.replaceState(null, "", newPath);
    } else {
      navigate(newPath);
    }
  };

  return {
    updateSearchParams,
    updateConcurrentSearchParams,
  };
};

export default useUpdateSearchParams;
