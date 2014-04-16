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
    /*afterShow: function() { 
        $('<div class="expander"></div>').appendTo(this.inner).click(function() {
            $(document).toggleFullScreen();
        });
    },
    afterClose: function() {
        $(document).fullScreen(false);
    }*/
  });
  $(document).bind("fullscreenerror", function() {
    alert("Browser rejected fullscreen change");
  });
  $('div.photo').hover(function() {
    $(this).children('a.delete, a.share, a.edit, p').fadeIn(300);
  }, function() {
    $(this).children('a.delete, a.share, a.edit, p').fadeOut(300);
  });
  $('div.photo a.share').click(function(){
    $( "#link_share" ).dialog({
      modal: true,
    });
    $('.link_share').val(window.location.host + $(this).attr("href")).select();
    return false;
  });
  var client = new ZeroClipboard($('#target-to-copy'));

  client.on('load', function(client){
    //alert( "movie is loaded" );

    //client.on('datarequested', function(client){
      //client.setText(this.innerHTML);
    //});

    client.on('complete', function(client, args){
      $('#link_share').after('<p>Text Copied.</p>');
      $('#link_share').dialog('close');
    });
  });

  client.on('wrongflash noflash', function(){
    ZeroClipboard.destroy();
  });
});