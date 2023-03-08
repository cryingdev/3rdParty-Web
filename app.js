const express = require('express');
const path = require('path');

const app = express();

var token = ""

// Define routes
app.get('*.js', function(req, res, next) {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

app.get('/', (req, res) => {
    //res.send('Hello, world!');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/main', (req, res) => {
    //res.send('Hello, world!');
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/auth/google/callback', function(req, res) {
  var name = req.query.name;
  var email = req.query.email;

  // Save the user data to your database or perform any necessary actions
  console.log(req)
  // Redirect the user to the main page
  res.redirect(`/main?via=google&name=${name}&email=${email}`);
});

app.get('/auth/naver/callback', function(req, res) {
  var id_token = req.query.id_token;
  var name = req.query.email;

  // Save the user data to your database or perform any necessary actions
  console.log(req)
  // Redirect the user to the main page
  res.redirect('/main?via=naver');
});


app.get('/auth/kakao/callback', function(req, res) {
  var id_token = req.query.id_token;
  token = id_token
  var name = req.query.email;

  // Save the user data to your database or perform any necessary actions
  console.log(req)
  // Redirect the user to the main page
  res.redirect('/main?via=kakao');
});

app.get('/logout' , (req,  res) => {
  google.accounts.id.revoke(token, done => {
    console.log(done.error);
  });
});

// Serve the static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'css')));

module.exports = app;