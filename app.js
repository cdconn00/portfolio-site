require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const email = require('./email/email');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', async (req, res) => {
	if (
		req.body.hdnRecaptcha === undefined ||
		req.body.hdnRecaptcha === null ||
		req.body.hdnRecaptcha === '' ||
		req.body.txtEmail === null
	) {
		res.status(400).send();
	} else {
		const secretKey = process.env.captchaSecret;
		const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.hdnRecaptcha}&remoteip=${req.connection.remoteAddress}`;

		fetch(verifyUrl)
			.then((res) => res.json())
			.then((json) => {
				if (json.success !== undefined && !json.success) {
					throw new Error('Captcha verification failed');
				}
			})
			.then(async () => {
				if ((await email.sendContactEmail(req.body)) == 'Success') {
					res
						.status(200)
						.send('Success! Our best owl is on the way with your message.');
				} else {
					res.status(400).send();
				}
			})
			.catch((err) => {
				res.status(400).send();
			});
	}
});

app.get('/resume', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/files/Cole_Connelly_Resume.pdf'));
});

app.get('/sitemap.xml', (req, res) => {
	res.sendFile(path.join(__dirname, '/sitemap.xml'));
});

app.get('/*', (req, res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 8080);
