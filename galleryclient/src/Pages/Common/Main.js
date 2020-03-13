import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Homepage from "./Homepage";
import NextTodo from "../Components/nextToDo/NextTodo";
import Artists from "../Components/Artists/Artists"

const Main = () => {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/Artists" component={Artists} />
      <Route exact path="/next-to-do" component={NextTodo} />
    </Router>
  );
};

export default Main;
