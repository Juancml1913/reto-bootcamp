import { Grid, Breadcrumbs, IconButton } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOptions } from "../../store/options/thunks";
const OptionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = useSelector((state) => state.options);
  const questions = useSelector((state) => state.questions);
  const columns = [
    { field: "option", headerName: "Respuesta", width: 500 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <IconButton
              onClick={() => {
                navigate(`/students/edit/${params.row.id}`);
              }}
            >
              <EditIcon />
            </IconButton>
          }
          label="Edit"
        />,
      ],
    },
  ];
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOptions(id));
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
        <Link to="/questions">Preguntas</Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item sm={6}>
          <h3>Respuestas</h3>
        </Grid>
        <Grid item sm={6}>
          <h3>{questions.find((q) => q.id === id).question}</h3>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={options}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default OptionsPage;
