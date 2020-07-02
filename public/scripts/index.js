$(function () {
	checkScroll();

	$(document).scroll(function () {
		checkScroll();
	});

	$("#lnkHowdy").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#landing').offset().top
		}, 600);
	});

	$("#lnkAbout").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#about').offset().top
		}, 600);
	});

	$("#lnkMission").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#mission').offset().top
		}, 600);
	});

	$("#lnkSkills").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#skills').offset().top
		}, 600);
	});

	$("#lnkProjects").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#projects').offset().top + 3
		}, 600);
	});

	$("#lnkContact").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#contact').offset().top + 3
		}, 600);
	});

	$(".toggler").on('click', function(){
		$('#navbar-collapse-toggle').toggle('slow');
	});

	$(".bouncer").on('click', function(){
		$('html, body').animate({
		    scrollTop: $('#about').offset().top
		}, 600);
	});

	$('.nav-link').on('click', function(){
		if ($(document).width() <= 768){
			$('#navbar-collapse-toggle').hide('slow');
		}
	});
});

function checkScroll() {
	$("#lnkHowdy").toggleClass('active', $(this).scrollTop() < $("#about").position().top - 1);
	$("#lnkAbout").toggleClass('active', $(this).scrollTop() + 1 >= $("#about").position().top && $(this).scrollTop() < $("#mission").position().top - 1);
	$("#lnkMission").toggleClass('active', $(this).scrollTop() + 1 >= $("#mission").position().top && $(this).scrollTop() < $("#skills").position().top - 1);
	$("#lnkSkills").toggleClass('active', $(this).scrollTop() + 1 >= $("#skills").position().top && $(this).scrollTop() < $("#projects").position().top - 1);
	$("#lnkProjects").toggleClass('active', $(this).scrollTop() + 1 >= $("#projects").position().top && $(this).scrollTop() < $("#contact").position().top - 1);
	$("#lnkContact").toggleClass('active', $(this).scrollTop() + 1 >= $("#contact").position().top);
	
	if ($(this).scrollTop() != 0){
		$(".bouncer").hide('fast');
	} else {
		$(".bouncer").show('fast');
	}
	
}
