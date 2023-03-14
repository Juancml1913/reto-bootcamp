import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AuthRoutes = () => {
  const info = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (info.state) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
