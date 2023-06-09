import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomAppBar from "../pages/CustomAppBar";
import StudentsRoutes from "../../students/routes/StudentsRoutes";
import QuestionsRoutes from "../../questions/routes/QuestionsRoutes";
import { getTypeDocuments } from "../../store/typeDocuments/thunks";
import FormRoutes from "../../form/routes/FormRoutes";

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://juancamilomunozlopez.vercel.app/"
        target="_blank"
      >
        Juan Camilo Muñoz López
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const HomeRoutes = () => {
  const info = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!info.state) {
      navigate("/auth/login");
    }
    dispatch(getTypeDocuments());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar user={info} />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home info={info} />} />
            <Route path="/students/*" element={<StudentsRoutes />} />
            <Route path="/questions/*" element={<QuestionsRoutes />} />
            <Route path="/form/*" element={<FormRoutes />} />
          </Routes>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default HomeRoutes;
