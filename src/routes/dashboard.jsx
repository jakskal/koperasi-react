import {createFileRoute, redirect} from "@tanstack/react-router";
import {Outlet} from "@tanstack/react-router";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import "../styles/dashboard.css";
import ErrorBoundary from "../component/ErrorBoundary/ErrorBoundary";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (!localStorage.getItem("authUser")) {
      throw redirect({to: "/login"});
    }
  },
  component: () => (
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
  ),
});
