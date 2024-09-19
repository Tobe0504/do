import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export type requestType = {
  isLoading: boolean;
  data: null | any;
  error: any;
};

type RequestType = {
  method: string;
  url: string;
  headers?: any;
  data?: any;
  isMultipart?: boolean;
  state?: requestType;
  setState?: Dispatch<SetStateAction<requestType>>;
  setNotificationsSuccess?: boolean;
  setNotificationsFailure?: boolean;
  successMessage?: string;
  successFunction?: () => void;
  errorFunction?: () => void;
  load?: boolean;
};

export default async function requestHandler({
  method,
  url,
  headers,
  data,
  isMultipart,
}: RequestType) {
  return new Promise((resolve, reject) => {
    // Context
    const userToken = localStorage.getItem("iseTutorAccessToken");

    axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": !isMultipart
          ? "application/json"
          : "multipart/form-data",
        ...headers,
      },
      data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
