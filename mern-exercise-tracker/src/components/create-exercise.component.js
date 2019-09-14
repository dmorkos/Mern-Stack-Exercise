import React, {Component} from 'react';

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
                <p>Your in the Create exercise  component</p>
            </div>
        )
    }
}
