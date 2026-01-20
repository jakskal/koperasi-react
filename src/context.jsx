import {createContext, useContext, useEffect, useState} from "react";
import {getProfile} from "./services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({children, value}) {
  const [user, setUser] = useState(value || null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUser() {
    const res = await getProfile();
    setUser(res.data);
    setIsLoading(false);
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
