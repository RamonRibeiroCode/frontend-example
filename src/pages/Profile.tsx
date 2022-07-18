import { useContext } from "react";
import AuthContext from "../contexts/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return <h1>Ola {user.name}</h1>;
};

export { Profile };
