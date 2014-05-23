jQuery(function() {
	$('#photos').masonry({
		itemSelector: '.photo',
		gutter: 10
	});
	$(".fancybox").fancybox({
		titleShow: true
	});
	$('div.photo').hover(function() {
		$(this).children('p.title, p.desc').fadeIn(300);
	}, function() {
		$(this).children('p.title, p.desc').fadeOut(300);
	});

});