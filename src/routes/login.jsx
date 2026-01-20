import {createFileRoute, useNavigate, redirect} from "@tanstack/react-router";
import {useContext, useState} from "react";
import {AuthContext} from "../context";
import {getProfile, setToken} from "../services/auth";
import {login} from "../services/auth";
import "../styles/login.css";
import {toast} from "sonner";
export const Route = createFileRoute("/login")({
  beforeLoad: async ({}) => {
    if (localStorage.getItem("authUser")) {
      throw redirect({to: "/dashboard"});
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      let loginResp = await login(formData.email, formData.password);
      setToken(loginResp.token);

      const profile = await getProfile();
      setUser({name: profile.data.name});
      await navigate({to: "/dashboard"});
    } catch (error) {
      toast.error("Gagal login. Silakan periksa kembali email dan password Anda.", {
        duration: 2000,
        closeButton: true,
      });
      console.error("Login error:", error);
    }
  }

  return (
    <div className="login__body">
      <div className="login__content">
        <h1 className="login__header">welcome</h1>
        <form className="login__form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
          <button type="submit" className="login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
