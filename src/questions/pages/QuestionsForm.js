import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Breadcrumbs,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../store/message/thunks";
import { Formik } from "formik";
import { storeQuestions, updateQuestions } from "../../store/questions/thunks";

export default function QuestionsForm({ edit }) {
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions);

  let initialForm = {
    question: "",
    options: [
      {
        option: "",
        state: true,
      },
      {
        option: "",
        state: false,
      },
      {
        option: "",
        state: false,
      },
      {
        option: "",
        state: false,
      },
    ],
  };
  const { id } = useParams();
  if (edit) {
    initialForm = questions.find((question) => question.id === parseInt(id));
    console.log(id);
    console.log(initialForm);
    initialForm = {
      ...initialForm,
      options: [
        {
          option: "",
          state: true,
        },
        {
          option: "",
          state: false,
        },
        {
          option: "",
          state: false,
        },
        {
          option: "",
          state: false,
        },
      ],
    };
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
          ? { ...o, state: e.target.checked }
          : { ...o, state: false }
      ),
    });
  };

  const handleValidate = (values) => {
    const errors = {};
    if (!form.question) {
      errors.question = "Required";
    }
    if (!edit) {
      if (!form.options[0].option) {
        errors.option1 = "Required";
      }
      if (!form.options[1].option) {
        errors.option2 = "Required";
      }
      if (!form.options[2].option) {
        errors.option3 = "Required";
      }
      if (!form.options[3].option) {
        errors.option4 = "Required";
      }
    }

    return errors;
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
              <Formik
                initialValues={initialForm}
                validate={handleValidate}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(form);
                  if (edit) {
                    dispatch(updateQuestions(form));
                  } else {
                    dispatch(storeQuestions(form));
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={form.question}
                        />
                        {errors.question && touched.question && errors.question}
                      </Grid>
                      {!edit && (
                        <>
                          <Grid item container xs={9} md={12} spacing={1}>
                            <Grid item xs={12} md={3}>
                              <TextField
                                autoComplete="option 1"
                                name="option1"
                                required
                                fullWidth
                                id="option1"
                                label="Opción 1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.options[0].option}
                              />
                              {errors.option1 &&
                                touched.option1 &&
                                errors.option1}
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                autoComplete="option 2"
                                name="option2"
                                required
                                fullWidth
                                id="option2"
                                label="Opción 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.options[1].option}
                              />
                              {errors.option2 &&
                                touched.option2 &&
                                errors.option2}
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                autoComplete="option 3"
                                name="option3"
                                required
                                fullWidth
                                id="option3"
                                label="Opción 3"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.options[2].option}
                              />
                              {errors.option3 &&
                                touched.option3 &&
                                errors.option3}
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <TextField
                                autoComplete="option 4"
                                name="option4"
                                required
                                fullWidth
                                id="option4"
                                label="Opción 4"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.options[3].option}
                              />
                              {errors.option4 &&
                                touched.option4 &&
                                errors.option4}
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
                              <Tooltip title="Seleccione la opción correcta">
                                <Radio
                                  checked={form.options[0].state}
                                  onChange={radioHandleChange}
                                  value="option1correct"
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                              </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Tooltip title="Seleccione la opción correcta">
                                <Radio
                                  checked={form.options[1].state}
                                  onChange={radioHandleChange}
                                  value="option2correct"
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                              </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Tooltip title="Seleccione la opción correcta">
                                <Radio
                                  checked={form.options[2].state}
                                  onChange={radioHandleChange}
                                  value="option3correct"
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                              </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Tooltip title="Seleccione la opción correcta">
                                <Radio
                                  checked={form.options[3].state}
                                  onChange={radioHandleChange}
                                  value="option4correct"
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12} md={12} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          {edit ? "Editar" : "Registrar"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
