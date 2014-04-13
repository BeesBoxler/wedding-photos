# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ->
  $('#new_photo').fileupload
    dataType: "script"
    add: (e, data) ->
      types = /(\.|\/)(gif|jpe?g|png)$/i
      file = data.files[0]
      if types.test(file.type) || types.test(file.name)
        data.context = $(tmpl("template-upload", file))
        $('#new_photo').append(data.context)
        data.submit()
      else
        alert("#{file.name} is not a gif, jpeg, or png image file")
    progress: (e, data) ->
      if data.context
        progress = parseInt(data.loaded / data.total * 100, 10)
        data.context.find('.bar').css('width', progress + '%')

  $('#photo_image').attr('name', 'photo[image]');
  $('#photo_image').fileupload();

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