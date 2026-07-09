import {createContext, useContext, useEffect, useState} from "react";
import {getProfile} from "./services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({children, value}) {
  const [user, setUser] = useState(value || null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
      setisAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>LOADING...</h2>
      </div>
    );
  }

  return <AuthContext.Provider value={{user, setUser, isLoading}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
