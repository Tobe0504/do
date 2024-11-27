import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  setLocalStorage,
} from "../HelperFunctions/decryptData";

interface AuthUserContextValues {
  loginDetails: {
    firstname: string;
    email: string;
    password: string;
    lastname: string;
  };
  setLoginDetails: Dispatch<
    SetStateAction<{
      firstname: string;
      email: string;
      password: string;
      lastname: string;
    }>
  >;
  signIn: () => void;
  signUp: () => void;
  logout: () => void;
  error: string;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
}

interface AuthUserContextProviderProps {
  children: React.ReactNode;
}

export const AuthUserContext = createContext({} as AuthUserContextValues);

const AuthUserContextProvider = ({
  children,
}: AuthUserContextProviderProps) => {
  // States
  const [loginDetails, setLoginDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [otp, setOtp] = useState("ise-task-user-email");

  //   Router
  const navigate = useNavigate();

  //   Utils
  const signUp = () => {
    setLocalStorage(loginDetails, "do-user", "user");

    setLocalStorage("true", "do-user-state", "userState");

    localStorage.removeItem("do-todos");
    localStorage.removeItem("summary");

    navigate("/dashboard");
  };

  const signIn = () => {
    setError("");
    const doUser = getLocalStorage("do-user", "user");

    if (
      loginDetails?.email !== doUser?.email ||
      loginDetails?.password !== doUser?.password
    ) {
      setError("Invalid login credentials");
      return;
    } else {
      setLocalStorage("true", "do-user-state", "userState");
      navigate("/dashboard");
    }
  };

  const logout = () => {
    navigate("/");
    setLocalStorage("false", "do-user-state", "userState");
  };

  return (
    <AuthUserContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
        signIn,
        signUp,
        logout,
        error,
        otp,
        setOtp,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
