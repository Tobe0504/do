import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthUserContextValues {
  loginDetails: {
    firstname: string;
    email: string;
    password: string;
  };
  setLoginDetails: Dispatch<
    SetStateAction<{
      firstname: string;
      email: string;
      password: string;
    }>
  >;
  signIn: () => void;
  signUp: () => void;
  logout: () => void;
  error: string;
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
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  //   Router
  const navigate = useNavigate();

  //   Utils
  const signUp = () => {
    localStorage.setItem("do-user", JSON.stringify(loginDetails));
    localStorage.setItem("do-user-state", "true");

    navigate("/dashboard");
  };

  //   Utils
  const signIn = () => {
    setError("");
    const doUser = localStorage.getItem("do-user");
    if (
      loginDetails.email !== JSON.parse(doUser as string).email ||
      loginDetails.password !== JSON.parse(doUser as string).password
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
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
