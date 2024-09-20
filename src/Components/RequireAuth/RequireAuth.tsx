import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLocalStorage } from "../../HelperFunctions/decryptData";

const RequireAuth = () => {
  // Local storage
  const user = getLocalStorage("do-user-state", "userState");

  // Location
  const location = useLocation();

  return (
    <>
      {user === "true" ? (
        <Outlet />
      ) : (
        <Navigate to="/sign-in" replace={true} state={location.pathname} />
      )}
    </>
  );
};

export default RequireAuth;
