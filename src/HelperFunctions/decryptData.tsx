import CryptoJS from "crypto-js";
import { tasksType } from "../Utilities/tasks";

type typeType = "tasks" | "user" | "userState" | "recycle";

export const decryptData = (localStorageKey: string, type: typeType) => {
  const secretKey =
    type === "tasks"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_TASKS
      : type === "user"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_USER
      : type === "recycle"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_RECYCLE
      : type === "userState"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_USER_STATE
      : "";

  const encryptedData = localStorage.getItem(localStorageKey);

  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey as string);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  const parsed = JSON.parse(decryptedData);
  return parsed;
};

export const encryptData = (data: tasksType[], type: typeType) => {
  const stringData = JSON.stringify(data);

  const secretKey =
    type === "tasks"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_TASKS
      : type === "user"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_USER
      : type === "recycle"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_RECYCLE
      : type === "userState"
      ? process.env.REACT_APP_CRYPTO_SECRET_KEY_USER_STATE
      : "";

  const encryptedData = CryptoJS.AES.encrypt(
    stringData,
    secretKey as string
  ).toString();

  return encryptedData;
};

export const setLocalStorage = (data: any, key: string, type: typeType) => {
  localStorage.setItem(key, encryptData(data, type));
};

export const getLocalStorage = (key: string, type: typeType) => {
  return decryptData(key, type);
};

export const onTasksImport = (tasks: tasksType) => {
  if (tasks) {
    setLocalStorage(tasks, "tasks", "tasks");
    alert("Tasks imported successfully!");
  }
};
