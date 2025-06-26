import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../Containers/ToastContainer/ToastContainer";

type ToastContextTypes = {
  showToast: (msg: string, duration: number) => void;
};

type ToastProviderTypes = { children: React.ReactNode };

export const ToastContext = createContext({} as ToastContextTypes);

export const ToastProvider = ({ children }: ToastProviderTypes) => {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const showToast = useCallback((msg: string, duration = 3000) => {
    setMessage(msg);
    setVisible(true);
    setIsExiting(false);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setVisible(false);
        setMessage(null);
      }, 500);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        message={message as string}
        visible={visible}
        isExiting={isExiting}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
