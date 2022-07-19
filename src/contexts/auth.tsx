import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { login, register } from "../services/user";
import { useNavigate } from "react-router-dom";

interface AuthContext {
  signed: boolean;
  loading: boolean;
  user: User;
  handleRegister: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    age: number
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

interface User {
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as User);

  const navigate = useNavigate();

  const handleRegister = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    age: number
  ) => {
    await register(email, firstName, lastName, password, age);
    await handleLogin(email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    const user = await login(email, password);

    setSigned(true);
    setUser(user);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    setSigned(false);
    navigate("/");
  };

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true);

      const storagedUser = localStorage.getItem("user");
      const storagedToken = localStorage.getItem("token");

      if (storagedUser && storagedToken) {
        api.defaults.headers.common.authorization = `Bearer ${storagedToken}`;
        const storagedUserParsed = JSON.parse(storagedUser);
        setUser(storagedUserParsed);
        setSigned(true);
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: signed,
        loading: loading,
        user,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
