const router = require('express').Router();
let User = require('../models/user.model');

/* this handles the first get HTTP request on the / user url
our route url is localhost::5000/users/ */
router.route('/').get((req,res)=> {
    User.find() // mongoose method it will get a list of all the users from the mongoDb atlas database, find method returns a promise, the results are returned in JSON format 
    .then(users => res.json(users)) // then we will get all the users, then res.json wwe will be returning somthing in JSON format, and what we will return are the users we got from the DB
    .catch(err => res.status(400).json('Error: ' + err))// if there is an error return a error msg
});
// handles http post requests /add 
router.route('/add').post((req,res)=> {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(()=>res.json('User added! '))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;