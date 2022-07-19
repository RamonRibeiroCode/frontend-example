import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import AuthContext from "../contexts/auth";

const Register = () => {
  const [email, setEmail] = useState("ramon@gmail.com");
  const [firstName, setFirstName] = useState("Ramon");
  const [lastName, setLastName] = useState("Ribeiro");
  const [password, setPassword] = useState("321");
  const [age, setAge] = useState(20);
  const [error, setError] = useState("");

  const { handleRegister: register } = useContext(AuthContext);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(email, firstName, lastName, password, age);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else {
        setError("Unexpected Error");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <button type="submit">Register</button>
      </form>

      {error && <span>{error}</span>}

      <Link to="/">I already have an account</Link>
    </div>
  );
};

export { Register };
