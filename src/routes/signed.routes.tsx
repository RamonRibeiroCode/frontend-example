import { Routes, Route } from "react-router-dom";

import { Profile } from "../pages/Profile";

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Profile />} />
  </Routes>
);

export default AuthRoutes;
