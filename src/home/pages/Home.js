import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Home({ info }) {
  let cards = [];
  if (info.role === "admin") {
    cards = [
      {
        title: "Estudiantes",
        link: "/students",
        text: "Gestionar estudiantes",
      },
      {
        title: "Preguntas",
        link: "/questions",
        text: "Gestionar preguntas",
      },
    ];
  } else {
    cards = [
      {
        title: "Formulario",
        link: "/form",
        text: "Diligenciar formulario",
      },
    ];
  }
  return (
    <Grid container spacing={6} margin={1}>
      {cards.map((card) => (
        <Grid item key={card.title} xs={12} sm={6} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.text}</Typography>
            </CardContent>
            <CardActions>
              <Link to={card.link}>{card.title}</Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
