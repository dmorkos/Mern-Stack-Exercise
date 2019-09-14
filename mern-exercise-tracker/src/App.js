import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navBar.component";
import ExercisesList from "./components/exercises-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditExercise from "./components/edit-exercises.component";


function App() {
  return (
    // Nav Bar, ExercisesList, EditExercise,CreateExercise,CreateUser are all components we will create 
    // React Router helpes us map specific url paths to different components that 
    // will load on the page
    <Router>
      <div className = "container">
        <Navbar/>
        <br/>
        <Route path="/" exact component = {ExercisesList}/>
        <Route path="/edit/:id"  component = {EditExercise}/>
        <Route path="/create" component = {CreateExercise}/>
        <Route path="/user"  component = {CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
  