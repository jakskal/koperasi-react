import {createFileRoute, useNavigate, redirect} from "@tanstack/react-router";
import {useContext} from "react";
import {AuthContext} from "../context";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({}) => {
    if (localStorage.getItem("authUser")) {
      throw redirect({to: "/dashboard"});
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {setAuthUser} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>welcome</h1>
      <button
        onClick={() => {
          localStorage.setItem("authUser", JSON.stringify({name: "angling"}));
          setAuthUser({name: "angling"});
          navigate({to: "/dashboard"});
        }}
      >
        Login
      </button>
    </div>
  );
}
