$(document).ready(function() {
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
  $('div.photo').hover(function() {
    $(this).children('a.delete, a.share, a.edit, p').fadeIn(300);
  }, function() {
    $(this).children('a.delete, a.share, a.edit, p').fadeOut(300);
  });
  $('a.share').click(function(){
    $( "#link_share" ).dialog({
      modal: true,
      draggable: false,
      resizable: false,
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
      $('.message').addClass("success").fadeIn().html('<h3>Success!</h3><p>The text has been copied to your clipboard.</p>').delay(3000).fadeOut();
      $('#link_share').dialog('close');
    });
  });

  client.on('wrongflash noflash', function(){
    ZeroClipboard.destroy();
  });
  $('#photo_edit').click(function(){
    $('#edit_form').dialog({
      modal: true,
      height: 200,
      width: 360,
      draggable: false,
      resizable: false,
    });
    return false;
  });
  $('form.edit_user').submit(function(){
      $('.message').addClass("success").fadeIn().html('<h3>Success!</h3><p>The photos details have been updated.</p>').delay(3000).fadeOut();
      $('#edit_form').dialog('close');
  });
  var $container = $('#container');
  $container.infinitescroll({
    navSelector  : '.pagination',    // selector for the paged navigation 
    nextSelector : '.next_page',  // selector for the NEXT link (to page 2)
    itemSelector : '.photo',     // selector for all items you'll retrieve
    loading: {
        finishedMsg: '<em>No more images to load.</em>',
        msgText: "",
        img: '/assets/ajax-loader.png'
      }
    },
    // trigger Masonry as a callback
    function( newElements ) {
      var $newElems = $( newElements );
      $container.masonry( 'appended', $newElems );
    }
  );
});