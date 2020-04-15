// Dependencies 
const express = require('express');
const app = express();
const users = require('./routes/users');
const path = require('path')

//-----------------------------------

app.use('/api/users', users);

app.get('/courses', (req, res) => {
    res.send([1,2,3,4]);
});

app.get('/courses/:id' , (req, res) => {
    res.send(req.params.id);
});

app.get('/ping', (req, res) => {
  return res.send('pong')
})

//locally serving static build files of react app

// app.use(express.static(path.join(__dirname, '/../react-app/build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../react-app/build', 'index.html'))
// })


// PORT
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

