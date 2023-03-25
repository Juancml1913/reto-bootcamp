import { Grid, Breadcrumbs, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getQuestions } from "../../store/questions/thunks";
const QuestionsPage = () => {
  const questions = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { field: "question", headerName: "Pregunta", width: 500 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Editar pregunta">
              <EditIcon />
            </Tooltip>
          }
          onClick={() => {
            navigate(`/questions/edit/${params.row.id}`);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Ver respuestas">
              <IconButton
                onClick={() => {
                  navigate(`/questions/${params.row.id}/options`);
                }}
              >
                <FactCheckIcon />
              </IconButton>
            </Tooltip>
          }
          label="Edit"
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
        <Link to="/">Inicio</Link>
      </Breadcrumbs>
      <Grid container>
        <Grid item sm={6}>
          <h3>Preguntas</h3>
        </Grid>
        <Grid item sm={6} style={{ alignSelf: "center" }}>
          <Link to="/questions/create">Crear nueva pregunta</Link>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={questions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default QuestionsPage;
