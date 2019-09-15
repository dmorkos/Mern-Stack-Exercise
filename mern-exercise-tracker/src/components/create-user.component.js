import React, {Component} from 'react';
import axios from 'axios';
// axios will be used to send http requests to the backend from the front-end

export default class CreateUser extends Component {
    constructor(props) {
        // In JS class you always need to call super when defining 
        // the constructor of a subclass 
        super(props);
        // setting the initial state of the component 
        // STate is how you create a variable in react 
        // this is how we relate this to the methods below
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // we will create properties of the state that will correspond to
            // the mongoDb document
            username: '',
        }
    }
    onChangeUserName(e) {
        this.setState({
             username: e.target.value // target is the textbox
        });
     }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        console.log(user);
        // here wel will send the user name details to our backend 
        axios.post('http://localhost:5000/users/add', user)
            //user is a Json object which we send as a request body
            // then is a promise so after it sent, we will be doing something with our 
            //promise
            .then(res =>console.log(res.data));


        this.setState({
            username: ''
        })
        
    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>username: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.username}
                            onChange = {this.onChangeUserName}
                            />
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Create user" className = "btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}
