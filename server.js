// imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person');


// setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connecting to DB
const connectionString = ''; // mongo connection string
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.set('useCreateIndex', true);


// listening on port 
const port = 3000;
app.listen(port);


// GET Request
app.get('/person', (req, res) => {
    Person.find()
    .then(result => res.json(result))
    .catch(error => console.log(error))
});


// POST Request
app.post('/person', (req, res) => {
    const person = new Person(req.body);
    person.save((error, person) => {
        if(error)
            return res.send(error)
        res.json(person);
    })
});


// GET particular person
app.get('/person/:personId', (req, res) => {
    Person.findById(req.params.personId, 
        (error, person) => {
            if(error)
                return res.send(error);
            res.json(person);
    })
})


// PUT Request
app.put('/person/:personId', (req, res) => {
    Person.findByIdAndUpdate(req.params.personId, req.body, {new: true}, 
        (error, person) => {
            if(error)
                return res.send(error)
            res.json(person);
        })
})


// DELETE Request
app.delete('/person/:personId', (req, res) => {
    Person.findByIdAndDelete(req.params.personId, 
        (error, person) => {
            if(error)
                return res.send(error)
            res.send('Deleted')
    })
})


// Handling 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
