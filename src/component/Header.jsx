import {useContext} from "react";
import {AuthContext} from "../context";
import {useNavigate} from "@tanstack/react-router";
import muslimImg from "../assets/muslim.png";
import "../styles/dashboard-header.css";
import {logout} from "../services/auth";

export default function Header() {
  const {user, setUser, isLoading} = useContext(AuthContext);

  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main__header">
      <div className="main__header--search">
        <h3>Welcome</h3>
      </div>
      <div className="main__header--profile">
        <button
          className="main__header--button"
          onClick={() => {
            logout();
            setUser(null);
            navigate({
              to: "/login",
            });
          }}
        >
          logout
        </button>
        <img src={muslimImg} alt="User avatar" className="main__header--avatar" />
        <p className="main_header--username">{user.name}</p>
      </div>
    </div>
  );
}
