import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        // In JS class you always need to call super when defining 
        // the constructor of a subclass 
        super(props);
        // setting the initial state of the component 
        // STate is how you create a variable in react 
        // this is how we relate this to the methods below
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
            // we will create properties of the state that will correspond to
            // the mongoDb document
            username: '',
            description: '',
            duration : 0,
            date: new Date(),
            users: []
        }
    }
    // this is a react lifecycle method 
    // will automatically get called right before anything gets displayed on the screen
    componentDidMount() {
        this.setState({
            users: ['test users'],
            username: 'testUser'
        })

    }
    onChangeUserName(e) {
       this.setState({
            username: e.target.value // target is the textbox
       });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value // target is the textbox
        });
     }
     onChangeDuration(e) {
        this.setState({
             username: e.target.value // target is the textbox
        });
     }
     
     onChangeDate(date) {
        this.setState({
             date: date 
        });
     }
     onSubmit(e) {
         e.preventDefault();

         const exercise = {
             username: this.state.username,
             description: this.state.description,
             duration: this.state.duration,
             date: this.state.date
         }
         console.log(exercise)
         window.location = '/' // got back to home page
     }


    render() {
        return (
          <div>
              <h3>Create new exercise log </h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>UserName</label>
                      <select ref = "userInput"
                        required
                        className="form-control"
                        value = {this.state.username}
                        onChange={this.onChangeUserName}>
                         {
                             // getting data from the db and using that data to be added to the dropdown method
                            // This.state.users => give you an array of all the users 
                            //from mongodb.map allows us to map each element of the array 
                            // 
                            this.state.users.map(function(user) {
                                //it will return an option which is part of the select box
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type = "test"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange = {this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration in (m)</label>
                        <input 
                            type = "text"
                            className="form-control"
                            value={this.state.duration}
                            onChange = {this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                Selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value = "Create Exercise Log" className="btn btn-primary"/>
                    </div>

              </form>
          </div>
        )
    }
}
