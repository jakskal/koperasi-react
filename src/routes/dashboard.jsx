import {createFileRoute, redirect} from "@tanstack/react-router";
import {Outlet} from "@tanstack/react-router";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import "../styles/dashboard.css";
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";
import {useContext} from "react";
import {AuthContext} from "../context";
import {toast} from "sonner";
import {getProfile} from "../services/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({context, location}) => {
    const token = localStorage.getItem("token");
    if (!token) throw redirect({to: "/login"});
    let user = null;
    if (token) {
      try {
        user = await getProfile();
        context.auth.setUser(user.data);
      } catch (error) {
        toast.error("Sesi Anda telah berakhir. Silakan login kembali.", {
          duration: 2000,
          closeButton: true,
        });
        console.error("Token invalid or expired:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        throw redirect({to: "/login"});
      }
    }
    if (user?.data?.role_id === 3 && !["/dashboard", "/dashboard/"].includes(location.pathname)) {
      throw redirect({to: "/dashboard"});
    }
    return {user};
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  const {user} = useContext(AuthContext);
  const isAdminRole = [0, 1, 2].includes(user?.role_id);

  return (
    <div className={isAdminRole ? "dashboard" : "dashboard dashboard--no-sidebar"}>
      <div className="dashboard__header">
        <Header />
      </div>
      {isAdminRole && (
        <div className="dashboard__sidebar">
          <SideBar />
        </div>
      )}
      <div className="dashboard__content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
