#!/opt/bitnami/nodejs/bin node
var express = require('express'),
    app = express();
var db = require("./models")
var controllers = require('./controllers');

app.get('/api', controllers.api.index);
// Create route for html to be shown
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
//Create a route for reviews to be shown
app.get('/pubHub/:pubHubId/reviews', function homepage(req, res) {
  res.sendFile(__dirname + '/views/reviews.html');
});

app.use(express.static('public'));
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (next)
    next();
});

app.get('/api/pubHubs', controllers.pubHub.index);


app.get('/api/pubHubs/:id', controllers.pubHub.show);

app.post('/api/pubHubs', controllers.pubHub.create);

app.put('/api/pubHubs/:id', controllers.pubHub.update);

app.delete('/api/pubHubs/:id', controllers.pubHub.destroy);

//Routes for review page
app.get('/api/pubHubs/:pubHubId/reviews', controllers.review.index);

app.post('/api/pubHubs/:pubHubId/reviews', controllers.review.create);

app.put('/api/pubHubs/:pubHubId/reviews/:id', controllers.review.update);

app.delete('/api/pubHubs/:pubHubId/reviews/:id', controllers.review.destroy);

app.listen(process.env.PORT || 4000, function () {
  console.log('Express server is up and running on http://localhost:4000');
});
