import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import FormPage from "../pages/FormPage";

const FormRoutes = () => {
  const info = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!info.state) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
    </Routes>
  );
};

export default FormRoutes;
