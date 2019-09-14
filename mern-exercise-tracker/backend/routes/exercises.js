const router = require('express').Router();
let Exercise = require('../models/exercise.model');

/* this handles the first get HTTP request on the / user url
our route url is localhost::5000/users/ */
router.route('/').get((req,res)=> {
    Exercise.find() // mongoose method it will get a list of all the users from the mongoDb atlas database, find method returns a promise, the results are returned in JSON format 
    .then(exercises => res.json(exercises)) // then we will get all the users, then res.json wwe will be returning somthing in JSON format, and what we will return are the users we got from the DB
    .catch(err => res.status(400).json('Error: ' + err))// if there is an error return a error msg
});
// handles http post requests /add 
router.route('/add').post((req,res)=> {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })

    newExercise.save()
        .then(()=>res.json('Exercise added! '))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/:id').get((req,res)=> {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req,res)=> {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => { // this url recieves a Json Obejct 
    Exercise.findByIdAndUpdate(req.params.id)
        .then( exercise=> { // this is the exercise we got from the database 
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;