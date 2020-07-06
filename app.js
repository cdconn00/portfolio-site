const express        = require('express'),
	  app            = express(),
	  bodyParser     = require('body-parser'),
	  path           = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/resume', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/files/Connelly-Cole-Resume.pdf'));
});

app.get('/*', (req, res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
