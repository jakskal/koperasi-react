import {useContext} from "react";
import {AuthContext} from "../context";
import {useNavigate} from "@tanstack/react-router";

export default function Header() {
  const {authUser, setAuthUser} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      {authUser ? (
        <button
          onClick={() => {
            localStorage.removeItem("authUser");
            setAuthUser(null);
            navigate({
              to: "/login",
            });
          }}
        >
          logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
