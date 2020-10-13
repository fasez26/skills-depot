import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth, db } from "./components/firebase/Firebase";
import Home from './components/signing/Home';
import Tasks from './components/tasks/Tasks';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);
  // const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
        console.log('holiii',firebaseUser)
        // console.log(firebaseUser);
      } else {
        setFirebaseUser(null);
      }
    });
    // const getData = async () => {
    //   try {
    //     const current = auth.currentUser;
    //     if (!current) return;
    //     const uid = current.uid;
    //     console.log("yo merengues", uid);
    //     // const data = await db.collection("user").doc(uid).get();
    //     // console.log(data);
    //     // const arrayData = { user: data.user, ...data.data() };
    //     // setUserName(arrayData);
    //     // console.log(arrayData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getData();
  }, []);
  return firebaseUser !== false ? (
    <div >
    <Router >
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/Tasks' render={() => <Tasks />} />
       
        </Switch>
      </Router>
    </div>
  ): (
    <p>Cargando...</p>
  );
}


export default App;
