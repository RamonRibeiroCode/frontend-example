import { AxiosError } from "axios";
import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";

const Login = () => {
  const [email, setEmail] = useState("lara@gmail.com");
  const [password, setPassword] = useState("321");
  const [error, setError] = useState("");

  const { handleSignin } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleSignin(email, password);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else {
        setError("Erro Inesperado");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <span>{error}</span>}
    </div>
  );
};

export { Login };
