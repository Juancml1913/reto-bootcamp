import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Grid, MenuItem, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeStudents, updateStudents } from "../../store/students/thunks";
import { showMessage } from "../../store/message/thunks";

export default function StudentsForm({ edit }) {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students);

  const documentTypes = [
    {
      id: 0,
      type: "Cédula",
    },
    {
      id: 1,
      type: "Tarjeta de identidad",
    },
    {
      id: 2,
      type: "Cédula extranjera",
    },
  ];

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
  };
  const { id } = useParams();
  if (edit) {
    initialForm = students.find((student) => student.id === id);
  }
  const [form, setForm] = useState({
    ...initialForm,
    typeDocument: initialForm.typeDocument - 1,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.firstName === "" ||
      form.surname === "" ||
      form.typeDocument === "" ||
      form.documentNumber === "" ||
      form.email === "" ||
      form.phone === ""
    ) {
      dispatch(showMessage("Algunos campos son obligatorios."));
      return;
    }
    /*const formData = new FormData();
    formData.append("id", form.id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("order", form.order);
    formData.append("image", form.image);*/

    if (edit) {
      dispatch(updateStudents(form));
    } else {
      dispatch(storeStudents(form));
    }
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
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
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
                      value={form.documentNumber}
                    />
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
                      value={form.typeDocument}
                    >
                      {documentTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.type}
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
                      value={form.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      id="secondName"
                      label="Second Name"
                      name="secondName"
                      autoComplete="secondName"
                      onChange={handleChange}
                      value={form.secondName}
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
                      value={form.surname}
                    />
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
                      value={form.secondSurName}
                    />
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
                      value={form.email}
                    />
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
                      value={form.phone}
                    />
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
