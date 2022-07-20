import { useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";

import AuthContext from "../contexts/auth";
import api from "../services/api";

interface Profile {
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  photos: ProfilePhoto[];
}

interface ProfilePhoto {}

const Profile = () => {
  const [profile, setProfile] = useState({} as Profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { handleLogout } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const response = await api.get("/users/profile");

      setProfile(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Unexpected Error");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <table>
        <tr>
          <td>Years:</td>
          <td>{profile.age}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{profile.email}</td>
        </tr>
        <tr>
          <td>First Name:</td>
          <td>{profile.firstName}</td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td>{profile.lastName}</td>
        </tr>
      </table>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export { Profile };
