import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {createRootRoute, Outlet} from "@tanstack/react-router";
import {AuthContext} from "../context";
import {useState} from "react";

export const Route = createRootRoute({
  component: () => {
    const [authUser, setAuthUser] = useState(() => {
      const user = localStorage.getItem("authUser");
      return user ? JSON.parse(user) : null;
    });
    
    return (
      <>
        <AuthContext.Provider
          value={{
            authUser,
            setAuthUser,
          }}
        >
          <Outlet />
        </AuthContext.Provider>
        <TanStackRouterDevtools />
        {/* <ReactQueryDevtools /> */}
      </>
    );
  },
});
