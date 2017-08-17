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

	$('.js-hot-table-row').find('.category-small').removeAttr('style');
	if ($(window).width() < 980) {
		return;
	}
	$('.js-hot-table-row').each(function() {
		var max = 0;
		$(this).find('.category-small').each(function() {
			if ($(this).innerHeight() > max) {
				max = $(this).innerHeight();
			}
		});
		$(this).find('.category-small').innerHeight(max);
	});
}

function equalHeightBottom() {
	$('.js-equal-bottom').removeAttr('style');
	if ($(window).width() < 980 && $(window).width() >=1440) {
		return;
	}
	var maxHeight = 0;
	$('.js-equal-bottom').each(function() {
		if ($(this).innerHeight() > maxHeight) {
			maxHeight = $(this).innerHeight();
		}
	});
	$('.js-equal-bottom').innerHeight(maxHeight);
}
function equalHeightBottom3() {
	$('.js-equal-bottom-3').removeAttr('style');
	if ($(window).width() < 1440) {
		return;
	}
	var maxHeight = 0;
	$('.js-equal-bottom-3').each(function() {
		if ($(this).innerHeight() > maxHeight) {
			maxHeight = $(this).innerHeight();
		}
	});
	$('.js-equal-bottom-3').innerHeight(maxHeight);
}


$(function() {
	mobileMenu();
	menuSidebar();
	equalHeightHot();
	equalHeightBottom3();
	equalHeightBottom();
});

$(window).resize(function() {
	equalHeightHot();
	equalHeightBottom3();
	equalHeightBottom();
});

function forbidScroll(e) {
	e.preventDefault();
}