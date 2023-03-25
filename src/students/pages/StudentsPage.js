import { Grid, Breadcrumbs, IconButton } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { getStudents } from "../../store/students/thunks";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const StudentsPage = () => {
  const { students, typeDocuments } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { field: "documentNumber", headerName: "# Documento", width: 130 },
    {
      field: "firstName",
      headerName: "Nombres",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.secondName || ""}`,
    },
    {
      field: "lastName",
      headerName: "Apellidos",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.surname || ""} ${params.row.secondSurName || ""}`,
    },
    {
      field: "typeDocument",
      headerName: "Tipo de documento",
      width: 130,
      valueGetter: (params) => {
        return typeDocuments.find((type) => type.id === params.row.typeDocument)
          .name;
      },
    },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "Teléfono", width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            navigate(`/students/edit/${params.row.id}`);
          }}
          label="Edit"
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item sm={6}>
          <h3>Estudiantes</h3>
        </Grid>
        <Grid item sm={6} style={{ alignSelf: "center" }}>
          <Link to="/students/create">Crear nuevo estudiante</Link>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default StudentsPage;
