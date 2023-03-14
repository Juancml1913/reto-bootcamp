import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import StudentsForm from "../pages/StudentsForm";
import StudentsPage from "../pages/StudentsPage";

const StudentsRoutes = () => {
  const info = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!info.state) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<StudentsPage />} />
      <Route path="/create" element={<StudentsForm edit={false} />} />
      <Route path="/edit/:id" element={<StudentsForm edit={true} />} />
    </Routes>
  );
};

export default StudentsRoutes;
