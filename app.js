const express        = require('express'),
	  app            = express(),
	  bodyParser     = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/*', (req, res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
