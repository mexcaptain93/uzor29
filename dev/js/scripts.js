function mobileMenu() {
	const bodyOverflow = $('body').css('overflow');
	$('.js-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-mobile-menu').slideDown(200);
		document.addEventListener('touchmove', forbidScroll);
		$('body').css({'overflow': 'hidden'});
	});
	$('.js-mobile-menu-close').on('click', function(e) {
		e.preventDefault();
		$('.js-mobile-menu').slideUp(200);
		document.removeEventListener('touchmove', forbidScroll);
		$('body').css({'overflow': bodyOverflow});
	});

	$('.js-mobile-menu-categories-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-mobile-menu-categories').slideToggle(200);
		$(this).find('i').toggleClass('rotated');
	});
}

function menuSidebar() {
	$('.js-menu-sidebar-item > a').on('click', function(e) {
		e.preventDefault();
		var ul = $(this).parent().find('ul');
		if (ul.is(":visible")) {
			ul.slideUp();
		} else {
			$('.js-menu-sidebar').find('ul').slideUp();
			ul.slideDown();
		}
	});
}


function equalHeightHot() {

	$('.js-hot-table-row .category-small').matchHeight({});
}

function equalHeightBottom() {
	if ($(window).width() < 980 && $(window).width() >= 1366) {
		return;
	}
	$('.js-equal-bottom').matchHeight({});
}

function equalHeightBottom3() {
	if ($(window).width() < 1365) {
		return;
	}
	$('.js-equal-bottom-3').matchHeight({});
}


$(function() {
	mobileMenu();
	menuSidebar();
	if ($(window).width() >= 980) {
		equalHeightHot();
		if ($(window).width() <= 1365) {
			equalHeightBottom();
		} else {
			equalHeightBottom3();
		}
	}

});

$(window).resize(function() {
	if ($(window).width() >= 980) {
		equalHeightHot();
		if ($(window).width() <= 1365) {
			equalHeightBottom();
		} else {
			equalHeightBottom3();
		}
	}
});

function forbidScroll(e) {
	e.preventDefault();
}