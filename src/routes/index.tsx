import { useContext } from "react";

import AuthRoutes from "./auth.routes";
import SignedRoutes from "./signed.routes";

import AuthContext from "../contexts/auth.jsx";

const Routes = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <SignedRoutes /> : <AuthRoutes />;
};

export default Routes;
