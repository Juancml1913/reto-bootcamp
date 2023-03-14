import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Breadcrumbs,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../store/message/thunks";

export default function QuestionsForm({ edit }) {
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions);

  let initialForm = {
    question: "",
    options: [
      {
        option: "",
        iscorrect: true,
      },
      {
        option: "",
        iscorrect: false,
      },
      {
        option: "",
        iscorrect: false,
      },
      {
        option: "",
        iscorrect: false,
      },
    ],
  };
  const { id } = useParams();
  if (edit) {
    initialForm = questions.find((question) => question.id === id);
  }
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    let option = 0;
    if (e.target.name === "option1") {
      option = 0;
    } else if (e.target.name === "option2") {
      option = 1;
    } else if (e.target.name === "option3") {
      option = 2;
    } else if (e.target.name === "option4") {
      option = 3;
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
      return;
    }
    setForm({
      ...form,
      options: form.options.map((o, i) =>
        i === option ? { ...o, option: e.target.value } : o
      ),
    });
  };

  const radioHandleChange = (e) => {
    let correct = 0;
    if (e.target.value === "option1correct") {
      correct = 0;
    } else if (e.target.value === "option2correct") {
      correct = 1;
    } else if (e.target.value === "option3correct") {
      correct = 2;
    } else if (e.target.value === "option4correct") {
      correct = 3;
    }
    setForm({
      ...form,
      options: form.options.map((o, i) =>
        i === correct
          ? { ...o, iscorrect: e.target.checked }
          : { ...o, iscorrect: false }
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (
      form.question === "" ||
      form.options[0].option === "" ||
      form.options[1].option === "" ||
      form.options[2].option === "" ||
      form.options[3].option === ""
    ) {
      dispatch(showMessage("Algunos campos son obligatorios."));
      return;
    }

    /*if (edit) {
      dispatch(updateStudents(form));
    } else {
      dispatch(storeStudents(form));
    }*/
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
        <Link to="/questions">Preguntas</Link>
      </Breadcrumbs>

      <Grid container>
        <Grid item sm={12}>
          <Card sx={{ mt: "1em" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {edit ? "Editar pregunta" : "Crear pregunta"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="question"
                      name="question"
                      required
                      fullWidth
                      id="question"
                      label="Pregunta"
                      autoFocus
                      onChange={handleChange}
                      value={form.question}
                    />
                  </Grid>
                  <Grid item container xs={9} md={12} spacing={1}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        autoComplete="option 1"
                        name="option1"
                        required
                        fullWidth
                        id="option1"
                        label="Opción 1"
                        onChange={handleChange}
                        value={form.options[0].option}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        autoComplete="option 2"
                        name="option2"
                        required
                        fullWidth
                        id="option2"
                        label="Opción 2"
                        onChange={handleChange}
                        value={form.options[1].option}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        autoComplete="option 3"
                        name="option3"
                        required
                        fullWidth
                        id="option3"
                        label="Opción 3"
                        onChange={handleChange}
                        value={form.options[2].option}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        autoComplete="option 4"
                        name="option4"
                        required
                        fullWidth
                        id="option4"
                        label="Opción 4"
                        onChange={handleChange}
                        value={form.options[3].option}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    item
                    xs={3}
                    md={12}
                    style={{ textAlign: "center" }}
                  >
                    <Grid item xs={12} md={3}>
                      <Radio
                        checked={form.options[0].iscorrect}
                        onChange={radioHandleChange}
                        value="option1correct"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Radio
                        checked={form.options[1].iscorrect}
                        onChange={radioHandleChange}
                        value="option2correct"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Radio
                        checked={form.options[2].iscorrect}
                        onChange={radioHandleChange}
                        value="option3correct"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Radio
                        checked={form.options[3].iscorrect}
                        onChange={radioHandleChange}
                        value="option4correct"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={12} textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {edit ? "Editar" : "Registrar"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
