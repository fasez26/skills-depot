import React, { useEffect, useState, useCallback } from "react";
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
import { auth, app, db } from "../firebase/Firebase";
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
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(true);

  

  const login = useCallback(() => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        setEmail("");
        setPass("");
        setError(null);
        history.push("/Tasks");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("El formato del email es incorrecto");
            break;
          case "auth/weak-password":
            setError("La contraseña debe ser de mínimo 6 caracteres");
            break;
          case "auth/email-already-in-use":
            setError("Este email ya esta en uso");
            break;
          case "auth/wrong-password":
            setError(
              "La contraseña es incorrecta o el usuario no tiene password"
            );
            break;
          case "auth/user-not-found":
            setError("Usuario no encontrado");
            break;
          default:
            return;
        }
      });
  }, [email, pass, history]);

  useEffect(() => {
    if (app.auth().currentUser) {
      history.push("/Tasks");
    }
  }, [app.auth().currentUser]);

  const signUp = useCallback(async() => {
    try{
 
      const res = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(res)
      await db.collection('users').doc(res.user.uid).set({
          email: res.user.email,
          uid: res.user.uid
      })
        
        setEmail("");
        setPass("");
        setError(null);
        // const uid = app.auth().currentUser.uid;
        // const getUser = {
        //   email: email,
        //   userName: '',
        //   uid: uid,
        // }
        // db.collection("user").add(getUser);
        history.push("/Tasks");
        console.log("Entraste");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("El formato del email es incorrecto");
            break;
          case "auth/weak-password":
            setError("La contraseña debe ser de mínimo 6 caracteres");
            break;
          case "auth/email-already-in-use":
            setError("Este email ya esta en uso");
            break;
          case "auth/wrong-password":
            setError("La contraseña es incorrecta o el usuario no tiene password");
            break;
          case "auth/user-not-found":
            setError("Usuario no encontrado");
            break;
          default:
            return;
      }
   }
  });

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