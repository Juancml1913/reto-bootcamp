import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth/routes/AuthRoutes";
import HomeRoutes from "./home/routes/HomeRoutes";
import MessageModal from "./MessageModal";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Login */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* Aplicación */}
        <Route exact path="*" element={<HomeRoutes />} />
      </Routes>
      <MessageModal />
    </>
  );
};

export default AppRoutes;
