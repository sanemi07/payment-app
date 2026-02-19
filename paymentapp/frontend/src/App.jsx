import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUP";
import DashBoard from "./pages/DashBoard";
import Transfer from "./pages/Transfer";

const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public only */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* token required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/transfer" element={<Transfer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
