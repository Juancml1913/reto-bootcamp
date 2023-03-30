import {
  Grid,
  Breadcrumbs,
  Typography,
  CardContent,
  Box,
  Button,
  Radio,
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getForm, storeForm, updateState } from "../../store/form/thunks";
import { Formik } from "formik";
import Card from "@mui/material/Card";
import { useState } from "react";
const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, auth } = useSelector((state) => state);

  const radioHandleChange = (e) => {
    const options = form
      .find((q) => q.id == parseInt(e.target.value))
      .options.map((option) =>
        parseInt(e.target.name) === option.id
          ? { ...option, selected: true }
          : { ...option, selected: false }
      );
    const answer = form.map((q) =>
      q.id === parseInt(e.target.value) ? { ...q, options: options } : q
    );
    dispatch(updateState(answer));
  };

  const getAnswers = () => {
    const answers = [];
    form.forEach((question) => {
      question.options.forEach((option) => {
        if (option.selected) {
          answers.push(option.id);
        }
      });
    });
    const request = { estudianteId: auth.id, answers: answers };

    return request;
  };

  useEffect(() => {
    dispatch(getForm());
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item sm={12}>
          <Card sx={{ mt: "1em" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Formulario
              </Typography>
              <Formik
                initialValues={{}}
                //validate={handleValidate}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  dispatch(storeForm(getAnswers()));
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
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
                      {form.map((question, index) => (
                        <>
                          <Grid container key={question.id} item xs={12}>
                            <Grid item xs={2} md={4}>
                              <Typography variant="h6" component="div">
                                {index + 1}
                                {". "}
                              </Typography>
                            </Grid>
                            <Grid item xs={10} md={8}>
                              <Typography variant="h6" component="div">
                                {question.question}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h7" component="div">
                                Seleccione una opción:
                              </Typography>
                            </Grid>
                          </Grid>
                          {question.options.map((option, index) => (
                            <Grid
                              key={`${question.id}-${option.id}`}
                              item
                              xs={12}
                            >
                              <Radio
                                checked={option.selected}
                                onChange={radioHandleChange}
                                name={option.id.toString()}
                                value={question.id.toString()}
                                inputProps={{ "aria-label": "A" }}
                              />{" "}
                              {option.option}
                            </Grid>
                          ))}
                        </>
                      ))}
                      <Grid item xs={12} md={12} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          Enviar
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
};

export default FormPage;
