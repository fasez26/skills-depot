import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import WithAuthRoute from "../../WithAuthRoute";
import { auth, app } from "../firebase/Firebase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
// import Signing from "./Signing";
import "../../assets/styles/Styles.css";

const useStyles = makeStyles((theme) => ({
  textTitle: {
    color: "#fafafa",
    align: "center",
    marginTop: theme.spacing(-6),
    marginLeft: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(80),
    marginLeft: theme.spacing(17),
  },
  media: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(5),
  },
}));

function Tasks({ history }) {
  const classes = useStyles();
  const logout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };
  const openCourses = () => {
    history.push("/courses");
  };
  const openInv = () => {
    history.push("/HomeSI");
  };
  return (
    <div className="App container">
      {/* <WithAuthRoute /> */}
      <Grid container>
        <Grid item xs={12}>
          <CardMedia
            className={classes.media}
            image="https://i.ibb.co/crknqRh/test.png"
            title="Contemplative Reptile"
          />
          <Typography variant="h5" align="center" className={classes.textTitle}>
            Track your tasks
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={logout}
      >
        Log Out
      </Button>
      {/* <Signing /> */}
    </div>
  );
}

export default withRouter(Tasks);
