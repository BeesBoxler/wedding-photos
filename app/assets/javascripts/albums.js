jQuery(function() {
	$(".fancybox").fancybox({
		titleShow: true
	});
	$('div.photo').hover(function() {
		$(this).children('p.title, p.desc, a.delete').fadeIn(300);
	}, function() {
		$(this).children('p.title, p.desc, a.delete').fadeOut(300);
	});
});