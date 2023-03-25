import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Grid, MenuItem, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeStudents, updateStudents } from "../../store/students/thunks";
import { Formik } from "formik";

export default function StudentsForm({ edit }) {
  const dispatch = useDispatch();
  const { students, typeDocuments } = useSelector((state) => state);

  let initialForm = {
    id: 0, //1,
    firstName: "", //"daniel",
    secondName: "", //"jose",
    surname: "", //"cruz",
    secondSurName: "", //"casallas",
    typeDocument: 1, //1,
    documentNumber: "", //"123456789",
    email: "", //"danielc88@gmail.co,",
    phone: "", //"32123122314",
    password: "",
  };
  const { id } = useParams();
  if (edit) {
    initialForm = students.find((student) => student.id === parseInt(id));
  }

  const handleValidate = (values) => {
    const errors = {};
    if (!values.documentNumber) {
      errors.documentNumber = "Required";
    }
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.surname) {
      errors.surname = "Required";
    }
    if (!values.secondSurName) {
      errors.secondSurName = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.phone) {
      errors.phone = "Required";
    }
    if (!edit) {
      if (!values.password) {
        errors.password = "Required";
      }
    }

    return errors;
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
        <Link to="/students">Estudiantes</Link>
      </Breadcrumbs>

      <Grid container>
        <Grid item sm={12}>
          <Card sx={{ mt: "1em" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {edit ? "Editar estudiante" : "Crear estudiante"}
              </Typography>

              <Formik
                initialValues={initialForm}
                validate={handleValidate}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  if (edit) {
                    dispatch(updateStudents(values));
                  } else {
                    dispatch(storeStudents(values));
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          autoComplete="documentNumber"
                          name="documentNumber"
                          required
                          fullWidth
                          id="documentNumber"
                          label="Document Number"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.documentNumber}
                        />
                        {errors.documentNumber &&
                          touched.documentNumber &&
                          errors.documentNumber}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          id="typeDocument"
                          name="typeDocument"
                          select
                          label="Type document"
                          defaultValue="1"
                          helperText="Por favor seleccione un tipo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.typeDocument}
                        >
                          {typeDocuments.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          autoComplete="firstName"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          id="secondName"
                          label="Second Name"
                          name="secondName"
                          autoComplete="secondName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.secondName}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          required
                          fullWidth
                          id="surname"
                          label="Surname"
                          name="surname"
                          autoComplete="surname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.surname}
                        />
                        {errors.surname && touched.surname && errors.surname}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          required
                          fullWidth
                          id="secondSurName"
                          label="Second SurName"
                          name="secondSurName"
                          autoComplete="secondSurName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.secondSurName}
                        />
                        {errors.secondSurName &&
                          touched.secondSurName &&
                          errors.secondSurName}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="email"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          type="number"
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          autoComplete="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        {errors.phone && touched.phone && errors.phone}
                      </Grid>
                      {!edit && (
                        <Grid item xs={12} md={4}>
                          <TextField
                            type="password"
                            autoComplete="password"
                            name="password"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </Grid>
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
