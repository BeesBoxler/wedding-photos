//	var Submit = function() {
//	    $('this').parent().find('form').submit();
//	    return false;
//	};
//
//
//	imgLoad.on( 'done', function( instance ) {
//	  console.log('DONE  - all images have been successfully loaded');
//	});

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

$( document ).ready(function() {
});

$(document).on('ajax:success', '.delete', function() {
    // .parent() is the div containing this "X" delete link
    $(this).parent().fadeOut();
    }
);