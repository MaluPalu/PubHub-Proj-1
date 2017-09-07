var express = require('express'),
    app = express();
var db = require("./models")
var controllers = require('./controllers');

// Configure templates to be served with EJS
app.set("view engine", "ejs");

app.get('/api', controllers.api.index);
// Create route for html to be shown
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/reviews', function homepage(req, res) {
  res.sendFile(__dirname + '/views/reviews.html');
});

app.use(express.static('public'));
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (next)
    next();
});


app.get('/api/pubHub', controllers.pubHub.index);

app.post('/api/pubHub', controllers.pubHub.create);

app.put('/api/pubHub/:id', controllers.pubHub.update);

app.delete('/api/pubHub/:id', controllers.pubHub.destroy);

app.get('api/reviews', controllers.reviews.index1);


app.listen(process.env.PORT || 4000, function () {
  console.log('Express server is up and running on http://localhost:4000');
});
