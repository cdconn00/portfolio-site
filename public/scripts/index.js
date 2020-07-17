var words = $('.word'),
	wordArray = [],
	currentWord = 0;

$(function () {
	words[currentWord].style.opacity = 1;

	for (var i = 0; i < words.length; i++) {
		splitLetters(words[i]);
	}

	setTimeout(changeWord, 1000);
	setInterval(changeWord, 3000);

	checkScroll();

	$(document).scroll(function () {
		checkScroll();
	});

	$('#lnkHowdy').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#landing').offset().top,
			},
			600
		);
	});

	$('#lnkAbout').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#about').offset().top,
			},
			600
		);
	});

	$('#lnkMission').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#mission').offset().top,
			},
			600
		);
	});

	$('#lnkSkills').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#skills').offset().top,
			},
			600
		);
	});

	$('#lnkProjects').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#projects').offset().top + 3,
			},
			600
		);
	});

	$('#btnProjects').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#projects').offset().top + 3,
			},
			600
		);
	});

	$('#lnkContact').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#contact').offset().top + 3,
			},
			600
		);
	});

	$('#btnContact').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#contact').offset().top + 3,
			},
			600
		);
	});

	$('.toggler').on('click', function () {
		$('#navbar-collapse-toggle').toggle('slow');
	});

	$('.bouncer').on('click', function () {
		$('html, body').animate(
			{
				scrollTop: $('#about').offset().top,
			},
			600
		);
	});

	$('.nav-link').on('click', function () {
		if ($(document).width() <= 768) {
			$('#navbar-collapse-toggle').hide('slow');
		}
	});

	$('#frm')
		.submit(function (e) {
			e.preventDefault();
		})
		.validate({
			rules: {
				txtEmail: { required: true, email: true, maxlength: 100 },
				txtName: { required: true, maxlength: 100 },
				ddlSubject: { required: true },
				txtComments: { required: true, maxlength: 2000 },
			},
			messages: {
				txtEmail: {
					required: 'Please enter your email address.',
				},
				txtName: {
					required: 'Please enter your name.',
				},
				ddlSubject: {
					required: 'Please select a subject.',
				},
				txtComments: {
					required: 'Please enter your questions / comments / concerns.',
				},
			},
			errorPlacement: function (error, element) {
				error.appendTo(element.closest('.form-group'));
			},
			submitHandler: function () {
				var form = $('#frm');
				var url = form.attr('action');

				$.ajax({
					type: 'POST',
					url: url,
					data: form.serialize(),
					success: function (data) {
						$('#frm')[0].reset();
						$('html, body').animate({ scrollTop: 0 }, 'slow');

						$('#landing')
							.hide()
							.append(
								"<div class='alert alert-success' role='alert'>Message Sent.</div>"
							)
							.fadeIn(500);

						$('.alert').click(function () {
							$(this).hide();
						});
					},
					error: function () {
						$('#landing')
							.hide()
							.append(
								"<div class='alert alert-danger' role='alert'>Whoops, we couldn't send your message.</div>"
							)
							.fadeIn(500);

						$('.alert').click(function () {
							$(this).hide();
						});
					},
				});

				return false;
			},
		});
});

function checkScroll() {
	$('#lnkHowdy').toggleClass(
		'active',
		$(this).scrollTop() < $('#about').position().top - 1
	);
	$('#lnkAbout').toggleClass(
		'active',
		$(this).scrollTop() + 1 >= $('#about').position().top &&
			$(this).scrollTop() < $('#mission').position().top - 1
	);
	$('#lnkMission').toggleClass(
		'active',
		$(this).scrollTop() + 1 >= $('#mission').position().top &&
			$(this).scrollTop() < $('#skills').position().top - 1
	);
	$('#lnkSkills').toggleClass(
		'active',
		$(this).scrollTop() + 1 >= $('#skills').position().top &&
			$(this).scrollTop() < $('#projects').position().top - 1
	);
	$('#lnkProjects').toggleClass(
		'active',
		$(this).scrollTop() + 1 >= $('#projects').position().top &&
			$(this).scrollTop() < $('#contact').position().top - 1
	);
	$('#lnkContact').toggleClass(
		'active',
		$(this).scrollTop() + 1 >= $('#contact').position().top
	);

	if ($(this).scrollTop() != 0) {
		$('.bouncer').hide('fast');
	} else {
		$('.bouncer').show('fast');
	}
}

function changeWord() {
	var cw = wordArray[currentWord];
	var nw =
		currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];

	for (var i = 0; i < cw.length; i++) {
		animateLetterOut(cw, i);
	}

	for (var i = 0; i < nw.length; i++) {
		nw[i].className = 'letter behind';
		nw[0].parentElement.style.opacity = 1;
		animateLetterIn(nw, i);
	}

	currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
	setTimeout(function () {
		cw[i].className = 'letter out';
	}, i * 80);
}

function animateLetterIn(nw, i) {
	setTimeout(function () {
		nw[i].className = 'letter in';
	}, 340 + i * 80);
}

function splitLetters(word) {
	var content = word.innerHTML;
	word.innerHTML = '';
	var letters = [];

	for (var i = 0; i < content.length; i++) {
		var letter = document.createElement('span');
		letter.className = 'letter';
		letter.innerHTML = content.charAt(i);

		word.appendChild(letter);
		letters.push(letter);
	}

	wordArray.push(letters);
}
