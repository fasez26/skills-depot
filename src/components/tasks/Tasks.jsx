import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import WithAuthRoute from "../../WithAuthRoute";
import { auth, app, db } from "../firebase/Firebase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
// import Signing from "./Signing";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import StarIcon from "@material-ui/icons/Star";
import shortid from "shortid";
import "../../assets/styles/Styles.css";

const useStyles = makeStyles((theme) => ({
  textTitle: {
    color: "#fafafa",
    align: "center",
    marginTop: theme.spacing(-6),
    marginLeft: theme.spacing(4),
  },
  buttonDelete: {
    background: "#F71C30",
    color: "#FFFFFF",
    width: theme.spacing(7),
    height: theme.spacing(4),
  },
  buttonEdit: {
    background: "#FFFF00",
    color: "#000000",
    width: theme.spacing(7),
    height: theme.spacing(4),
  },
  textTitleTask: {
    color: "#fafafa",
    align: "center",
    marginTop: theme.spacing(5),
    // marginLeft: theme.spacing(4),
  },
  button: {
    // marginTop: theme.spacing(20),
    marginLeft: theme.spacing(17),
  },
  media: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(5),
  },
  root: {
    marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(5),
  },
  formTask: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    // marginLeft: theme.spacing(5),
  },
}));

function Tasks({ history, props }) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const uid = app.auth().currentUser.uid;
        // https://firebase.google.com/docs/firestore/query-data/get-data
        // const data = await db.collection("user").doc(uid).get();
        const data = await db.collection("tasks").where("uid", "==", uid).get();
        // const data = await db.collection("user").doc(uid).get().get();
        // console.log('data',data.docs);
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setTasks(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  
  const addTask = () => {
    const newTasks = {
      name: newTask,
      uid: app.auth().currentUser.uid,
      id: shortid.generate(),
      date: new Date().toLocaleString(),
      
    };
  const conection = db.collection("tasks").add(newTasks);
  
    setTasks([...tasks, { ...newTasks, id: conection.id }]);
    setNewTask("");
   
  };

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

      <Grid container justify="center">
        <Grid item xs={10}>
          <Typography
            variant="h6"
            align="left"
            className={classes.textTitleTask}
          >
            Add Task
          </Typography>

          <Card
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
            }}
          >
            <form className={classes.formTask} noValidate autoComplete="off">
              <TextField id="filled-basic" label="Task" variant="filled" onChange={(e) => setNewTask(e.target.value)}
              value={newTask}/>
            </form>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonAdd}
              onClick={() => addTask()}
              
            >
              Add
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Grid item xs={10}>
          <Typography
            variant="h6"
            align="left"
            className={classes.textTitleTask}
          >
            List of tasks
          </Typography>

          <Card
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
            }}
          >
            {tasks.map((item) => (
              <List
                component="nav"
                className={classes.root}
                aria-label="contacts"
              >
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText>{item.name} </ListItemText>
                  <ListItemText>{item.date.split(" ").pop()} </ListItemText>
                </ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonEdit}
                  // onClick={logout}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonDelete}
                  // onClick={logout}
                >
                  Delete
                </Button>
              </List>

              // <li className="list-group-item" key={item.id}>
              //   <span>{item.name}</span>
              //     <button
              //         className="btn btn-danger btn-sm float-right"
              //     >
              //         Eliminar
              //     </button>
              //     <button
              //         className="btn btn-warning btn-sm float-right mr-2"
              //     >
              //         Editar
              //     </button>
              // </li>
            ))}
          </Card>
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
    </div>
  );
}

export default withRouter(Tasks);
