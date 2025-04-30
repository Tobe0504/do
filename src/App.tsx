import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import { routeComponents } from "./Utilities/routes";

function App() {
  // Router
  const location = useLocation();

  // Effects
  useEffect(() => {
    const activeRoute = routeComponents?.find(
      (routes) => routes?.route === location?.pathname
    );

    document.title = activeRoute?.title as string;
  }, [location?.pathname]);

  return (
    <Routes>
      {/* <Route
        path={routes.BASE_URL}
        element={<Navigate to={routes.DASHBOARD} />}
      /> */}
      {routeComponents.map((route) => {
        if (route.properties?.includes("isProtected")) {
          <React.Fragment key={route.route}>
            <Route element={<RequireAuth />}>
              <Route path={route.route} element={route.component} />
            </Route>
          </React.Fragment>;
        }

        return (
          <React.Fragment key={route.route}>
            <Route path={route.route} element={route.component} />
          </React.Fragment>
        );
      })}
    </Routes>
  );
}

export default App;
