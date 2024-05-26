import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  // Local storage
  const user = localStorage.getItem("do-user-state");

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
