jQuery(function() {
	$(".fancybox").fancybox({
		titleShow: true
	});
	$('div.photo').hover(function() {
		$(this).children('p.title, p.desc').fadeIn(300);
	}, function() {
		$(this).children('p.title, p.desc').fadeOut(300);
	});
	$('a.edit').click(function(){
		$(this).hide();
		$('.delete, .saveFile, .addFile').fadeIn(300).css('display', 'inline-block');
		$('#album_name').removeClass('not_editing').addClass('editing').prop('disabled', false);
		return false;
	});
	$('.saveFile').click(function(){
		$('#edit_album_1').submit();
		$(this).hide();
		$('.delete, .addFile').hide();
		$('.edit').fadeIn(300).css('display', 'inline-block');
		$('#album_name').removeClass('editing').addClass('not_editing').prop('disabled', true);
	});
	$('.addFile').click(function(){
		console.log("Open windows to add files");
		return false;
	});
	$('#album_name').autosizeInput();
});