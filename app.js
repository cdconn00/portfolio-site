require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const email = require('./email/email');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', async (req, res) => {
	let emailStatus = await email.sendContactEmail(req.body);

	if (emailStatus == 'Success') {
		res
			.status(200)
			.send('Success! Our best owl is on the way with your message.');
	} else {
		res.status(400).send();
	}
});

app.get('/resume', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/files/Connelly-Cole-Resume.pdf'));
});

app.get('/*', (req, res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
