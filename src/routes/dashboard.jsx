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
import {useLoaderData} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({context}) => {
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
        console.log("Token invalid or expired:", error);
        localStorage.removeItem("token");
        throw redirect({to: "/login"});
      }
    }
    return {user};
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <Header />
      </div>
      <div className="dashboard__sidebar">
        <SideBar />
      </div>
      <div className="dashboard__content">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
