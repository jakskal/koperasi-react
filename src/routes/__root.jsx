import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {createRootRoute, Outlet, redirect} from "@tanstack/react-router";
import {AuthContext} from "../context";
import {useState} from "react";
import Header from "../component/Header";
import SideBar from "../component/SideBar";

export const Route = createRootRoute({
  beforeLoad: async ({location}) => {
    if (location.pathname === "/login") {
      return;
    }
    if (!localStorage.getItem("authUser")) {
      throw redirect({to: "/login"});
    }
  },
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
          <div className="index">
            <Header />
            <SideBar />
            <Outlet />
          </div>
        </AuthContext.Provider>
        <TanStackRouterDevtools />
        {/* <ReactQueryDevtools /> */}
      </>
    );
  },
});
