"use client";

import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const useUpdateSearchParams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const updateSearchParams = (
    key: string,
    value: string | undefined,
    method: "set" | "delete" | "get",
    scroll?: boolean
  ) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams.toString());

      if (method === "get") {
        return params.get(key);
      }

      if (method === "delete") {
        params.delete(key);
      } else if (value) {
        params.set(key, value);
      }

      navigate(`${location?.pathname}?${params.toString()}`);
    }
  };

  const updateConcurrentSearchParams = (
    updates: { [key: string]: string | undefined },
    method: "set" | "delete" | "get",
    scroll?: boolean
  ) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (method === "get") {
          return params.get(key); // Fetching a value for a specific key
        }

        if (method === "delete") {
          params.delete(key);
        } else if (value !== undefined) {
          params.set(key, value);
        }
      });

      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  return { updateSearchParams, updateConcurrentSearchParams };
};

export default useUpdateSearchParams;
