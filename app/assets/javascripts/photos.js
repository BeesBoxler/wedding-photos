jQuery(function() {
  $('#new_photo').fileupload({
    dataType: "script",
    add: function(e, data) {
      var file, types;
      types = /(\.|\/)(gif|jpe?g|png)$/i;
      file = data.files[0];
      if (types.test(file.type) || types.test(file.name)) {
        data.context = $(tmpl("template-upload", file));
        $('#new_photo').append(data.context);
        return data.submit();
      } else {
        return alert("" + file.name + " is not a gif, jpeg, or png image file");
      }
    },
    progress: function(e, data) {
      var progress;
      if (data.context) {
        progress = parseInt(data.loaded / data.total * 100, 10);
        return data.context.find('.bar').css('width', progress + '%');
      }
    }
  });
  $('#photo_image').attr('name', 'photo[image]');
  $('#photo_image').fileupload();
});

$( document ).ready(function() {
  $('#container').masonry({
    itemSelector: '.photo'
  });
  $(".fancybox").fancybox({
    titleShow: true
  });
  $('div.photo').hover(function() {
    $(this).children('a.delete').fadeIn(300);
    $(this).children('a.share').fadeIn(300);
  }, function() {
    $(this).children('a.delete').fadeOut(300);
    $(this).children('a.share').fadeOut(300);
  });
  $('div.photo a.share').click(function(){
    $('body').append('<div id="link_share" style="display:none;"><input name="clipboard-text" id="clipboard-text" class="link_share" type="text" value="'+$(this).attr("href")+'"></input><button id="target-to-copy" data-clipboard-target="clipboard-text">Click To Copy</button><p id="target-to-copy-text" style="display:none;">Text Copied.</p></div>');
    $( "#link_share" ).dialog({
      modal: true,
    });
    $('.link_share').select();
    return false;
  });
});