import {createFileRoute, useNavigate, redirect} from "@tanstack/react-router";
import {useContext, useState} from "react";
import {AuthContext} from "../context";
import {getProfile, setToken} from "../services/auth";
import {login} from "../services/auth";
import "../styles/login.css";
import {toast} from "sonner";
export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    localStorage.removeItem("authUser");

    const token = localStorage.getItem("token");
    if (!token) return;

    let hasValidSession = false;
    try {
      await getProfile();
      hasValidSession = true;
    } catch {
      localStorage.removeItem("token");
    }

    if (hasValidSession) {
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
      setUser(profile.data);
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
        <div className="login__brand">
          <div>
            <div className="login__eyebrow">Beta Internal</div>
            <h1 className="login__header">Koperasi</h1>
          </div>
        </div>
        <form className="login__form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </label>
          <button type="submit" className="login__button">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
