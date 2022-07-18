import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

import { Routes, Route } from "react-router-dom";

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AuthRoutes;
