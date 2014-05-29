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
});

$(document).on('ajax:success', '.delete', function() {
    // .parent() is the div containing this "X" delete link
    $(this).parent().fadeOut();
    }
);