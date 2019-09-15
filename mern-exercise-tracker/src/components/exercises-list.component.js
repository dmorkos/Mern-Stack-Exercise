import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// exercise component is a function react component 
// the key difference between a functional component and a class component is 
// the lack of state and lifecycle method 
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>   
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href ="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</a>
        </td>      
    </tr>
)
// this is a class component 
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []}; // initialzing the exercises array
        

    }
    // this code will run before the page is rendered 
    // and add the exercises to the list 
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({
                    exercises: response.data
                })
               
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));
            // after we delete the data fom the backend we also have to 
            //delete the exercise from whats being deleted to the user 
            // setState react will automatically update the page with that new state 

        this.setState({
            // for every element (el) in the exercise array we will filter it 
            // if element does not equal the selected array
            // _id comes from the mongodb object e
            exercises: this.state.exercises.filter(el => el._id !== id)
        })

    }
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise = {this.deleteExercise} key = {currentexercise._id}/>;
        })
    }

    render() {
        return (
           <div>
               <h3>Logged exercises</h3>
               <table className = "table">
                   <thead className = "thead-light"> 
                       <tr>
                           <th>Username</th>
                           <th>Description</th>
                           <th>Duration</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>

               </table>
           </div>
        )
    }
}
