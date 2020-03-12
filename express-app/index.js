const express = require('express');
const app = express();
const users = require('./routes/users');

app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send("HELLO WORLD!");
});

app.get('/courses', (req, res) => {
    res.send([1,2,3,4]);
});

app.get('/courses/:id' , (req, res) => {
    res.send(req.params.id);
});

// PORT
// Can set environment variable
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

