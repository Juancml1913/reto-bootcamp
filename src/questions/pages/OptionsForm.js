import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Checkbox, Grid, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateOptions } from "../../store/options/thunks";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function OptionsForm() {
  const dispatch = useDispatch();

  const options = useSelector((state) => state.options);

  const questions = useSelector((state) => state.questions);

  const { idQuestion, idOption } = useParams();

  const question = questions.find((q) => q.id === parseInt(idQuestion));

  let initialForm = options.find((option) => option.id === parseInt(idOption));

  initialForm = { ...initialForm, is_correct: false };

  const handleValidate = (values) => {
    const errors = {};
    if (!values.option) {
      errors.option = "Required";
    }

    return errors;
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
        <Link to="/questions">Preguntas</Link>
        <Link to={`/questions/${idQuestion}/options`}>Respuestas</Link>
      </Breadcrumbs>

      <Grid container>
        <Grid item sm={12}>
          <Card sx={{ mt: "1em" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Editar respuesta, pregunta: {question.question}
              </Typography>
              <Formik
                initialValues={initialForm}
                validate={handleValidate}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log(values);
                  dispatch(updateOptions(values));
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
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
                      <Grid item xs={6}>
                        <TextField
                          autoComplete="option"
                          name="option"
                          required
                          fullWidth
                          id="option"
                          label="Respuesta"
                          autoFocus
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.option}
                        />
                        {errors.option && touched.option && errors.option}
                      </Grid>
                      <Grid item xs={6}>
                        Correcta
                        <Checkbox
                          name="is_correct"
                          onChange={handleChange}
                          {...label}
                        />
                      </Grid>
                      <Grid item xs={12} md={12} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          Editar
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
