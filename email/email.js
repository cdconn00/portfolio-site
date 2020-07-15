const aws = require('aws-sdk');
const mailerObj = {};

aws.config.accessKeyId = process.env.accessKeyId;
aws.config.secretAccessKey = process.env.secretAccessKey;
aws.config.region = process.env.region;

var ses = new aws.SES();

mailerObj.sendContactEmail = async function (formData) {
	var content = '<p><b>Name:</b> ' + formData.txtName + '</p>';
	content += '<p><b>Email:</b> ' + formData.txtEmail + '</p>';
	content += '<p><b>Subject:</b> ' + formData.ddlSubject + '</p>';
	content += '<p><b>Comments:</b></p><p>' + formData.txtComments + '</p>';

	content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');

	var params = {
		Destination: {
			BccAddresses: [],
			ToAddresses: ['cdconn00@gmail.com'],
		},
		Source: 'Cole D. Connelly <cole@coledc.com>',
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8', 
					Data: content
				}, 
				Text: {
					Charset: 'UTF-8', 
					Data: content
				}
			},
			Subject: {
				Charset: 'UTF-8', 
				Data: 'Portfolio Site Contact Request'
			}
		},
		ReplyToAddresses: [formData.txtEmail],
	};

	var sendPromise = new aws.SES({ apiVersion: '2010-12-01' })
		.sendEmail(params)
		.promise();

	return new Promise((resolve, reject) => {
		sendPromise
			.then(async function (data) {
				resolve('Success');
			})
			.catch(function (err) {
				console.log(err);
				resolve('Error');
			});
	});
};

module.exports = mailerObj;
