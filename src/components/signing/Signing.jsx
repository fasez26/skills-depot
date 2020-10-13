import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { auth, app } from "../firebase/Firebase";
import Button from "@material-ui/core/Button";
import "../../assets/styles/Styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(13),
  },
  root: {
    marginTop: theme.spacing(15),
  },
}));

function Signing({ history }) {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);
  const [register, setRegister] = React.useState(true);

  useEffect(() => {
    if (app.auth().currentUser) {
      history.push("/Tasks");
    }
  }, [app.auth().currentUser]);

  const login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      setEmail("");
      setPass("");
      setError(null);
      console.log("toy dentro");
      history.push("/Tasks");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email no registrado");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass]);

  const signUp = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      setEmail("");
      setPass("");
      setError(null);
      console.log("toy dentro");
      history.push("/Tasks");
      //   props.history.push('/Personal')
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe ser de mínimo 6 caracteres");
      }
      if (error.code === "auth/email-already-in-us") {
        setError("Email ya en existe");
      }
    }
  }, [email, pass]);

  const signup = () => {
    console.log("registar");
    setRegister(false);
    setError(null);
  };
  const logIn = () => {
    console.log("login");
    setRegister(true);
    setError(null);
  };
  return (
    <div className="App container">
      <Grid container justify="center">
        <Grid item xs={10}>
          <Card
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
            }}
          >
            {register ? (
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    color="primary"
                  >
                    <strong>Login</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            ) : (
              <CardActionArea>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    color="secondary"
                  >
                    <strong>Register</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            )}

            <CardActions
              classes={{
                inputs: classes.inputs, // class name, e.g. `classes-nesting-root-x`
              }}
            >
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
              </Grid>
            </CardActions>

            <CardActions>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <LockIcon />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    id="input-with-icon-grid"
                    label="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                  />
                </Grid>
              </Grid>
            </CardActions>
            {error && (
              <CardContent>
                <Typography
                  variant="body1"
                  component="h2"
                  align="center"
                  color="secondary"
                >
                  <strong>{error}</strong>
                </Typography>
              </CardContent>
            )}
            {register ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                onClick={login}
              >
                Sing In
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                onClick={signUp}
              >
                Sing Up
              </Button>
            )}

            {register ? (
              <CardContent>
                <Typography variant="body1" component="h2" align="center">
                  <strong>Don't have an account? </strong>
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  align="center"
                  onClick={signup}
                  color="secondary"
                >
                  <strong>Register Now</strong>
                </Typography>
              </CardContent>
            ) : (
              <CardContent>
                <Typography variant="body1" component="h2" align="center">
                  <strong>Do you have account? </strong>
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  align="center"
                  onClick={logIn}
                  color="primary"
                >
                  <strong>Login </strong>
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Signing);
