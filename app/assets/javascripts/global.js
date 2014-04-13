//	var Submit = function() {
//	    $('this').parent().find('form').submit();
//	    return false;
//	};
//
//
//	imgLoad.on( 'done', function( instance ) {
//	  console.log('DONE  - all images have been successfully loaded');
//	});

$( document ).ready(function() {
  $('#container').imagesLoaded().done( function( instance ) {
    $('#container').masonry({
      itemSelector: '.photo'
    });
  });
});