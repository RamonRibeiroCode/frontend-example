import { useContext } from "react";
import AuthContext from "../contexts/auth";

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div>
      <h1>Ola {user.name}</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export { Profile };
