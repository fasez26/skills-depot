import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Signing from "./Signing";
import "../../assets/styles/Styles.css";


const useStyles = makeStyles((theme) => ({
  
  textTitle: {
    color: "#fafafa",
    align: "center",
    marginTop: theme.spacing(-10),
    marginLeft: theme.spacing(-2),
  },
  textTitles: {
    color: "#fafafa",
    align: "center",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  media: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();
  
  return (
    <div className="App container">
      <Grid container>
        <Grid item xs={12}>
          <CardMedia
            className={classes.media}
            image="https://i.ibb.co/crknqRh/test.png"
            title="Contemplative Reptile"
          />
          <Typography variant="h5" align="center" className={classes.textTitle}>
            Wellcome!!
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={classes.textTitles}
          >
            Track your tasks
          </Typography>
        </Grid>
      </Grid>
      <Signing />
    </div>
  );
}

export default Home;
