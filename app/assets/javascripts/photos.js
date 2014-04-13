//# Place all the behaviors and hooks related to the matching controller here.
//# All this logic will automatically be available in application.js.
//# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
$( document ).ready(function() {
  $('#container').imagesLoaded().done( function( instance ) {
    $('#container').masonry({
      itemSelector: '.photo'
    });
    $(".fancybox").fancybox({
      titleShow: true
    });
  });
  $('div.photo').hover(function() {
    $(this).children('a.delete').fadeIn(300);
    $(this).children('a.share').fadeIn(300);
  }, function() {
    $(this).children('a.delete').fadeOut(300);
    $(this).children('a.share').fadeOut(300);
  });
});