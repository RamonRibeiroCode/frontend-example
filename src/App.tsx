import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
