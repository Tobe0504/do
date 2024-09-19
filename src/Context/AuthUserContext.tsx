import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    localStorage.setItem("do-user", JSON.stringify(loginDetails));
    localStorage.setItem("do-user-state", "true");

    navigate("/dashboard");
  };

  const signIn = () => {
    setError("");
    const doUser = localStorage.getItem("do-user");
    if (
      loginDetails?.email !== JSON.parse(doUser as string)?.email ||
      loginDetails?.password !== JSON.parse(doUser as string)?.password
    ) {
      setError("Invalid login credentials");
      return;
    } else {
      localStorage.setItem("do-user-state", "true");
      navigate("/dashboard");
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.setItem("do-user-state", "false");
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
