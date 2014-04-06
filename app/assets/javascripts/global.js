$(function() {
	var Submit = function() {
	    $('this').parent().find('form').submit();
	    return false;
	};

	$('#container ul').masonry({
	  itemSelector: '.photo'
	});

	imgLoad.on( 'done', function( instance ) {
	  console.log('DONE  - all images have been successfully loaded');
	});
});