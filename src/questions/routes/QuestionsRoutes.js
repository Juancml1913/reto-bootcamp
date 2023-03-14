import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import OptionsPage from "../pages/OptionsPage";
import QuestionsForm from "../pages/QuestionsForm";
import QuestionsPage from "../pages/QuestionsPage";

const QuestionsRoutes = () => {
  const info = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!info.state) {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<QuestionsPage />} />
      <Route path="/:id/options" element={<OptionsPage />} />
      <Route path="/create" element={<QuestionsForm edit={false} />} />
      {/*
      <Route path="/edit/:id" element={<StudentsForm edit={true} />} />*/}
    </Routes>
  );
};

export default QuestionsRoutes;