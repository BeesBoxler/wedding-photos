jQuery(function() {

	function preload(imageArray) {
		$(imageArray).each(function () {
			$('<img />').attr('src',this).appendTo('body').hide();
		});
	}

	preload([
		'/assets/ajax-loader.png'
	]);

	var $container = $('section#photos');
	var $photo_type = '.single';
	/*$('section#photos').masonry({
		itemSelector: '.single',
		isFitWidth: true,
	});*/
	$('section#albums').hide();
	$('h1 a').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		if ($(this).attr("id") == "show_photos") {
			$('section#albums').hide();
			$('section#photos').show();
			/*$('section#album').masonry('destroy');
			$('section#photos').masonry({
				itemSelector: '.single',
				isFitWidth: true,
			});*/
			$container = $('section#photos');
			$photo_type = '.single';
		}
		if ($(this).attr("id") == "show_albums") {
			$('section#photos').hide();
			$('section#albums').show();
			/*$('section#photos').masonry('destroy');
			$('section#albums').masonry({
				itemSelector: '.album',
				isFitWidth: true,
			});*/
			$container = $('section#albums');
			$photo_type = '.album';
		}
		return false;
	});
	$(".fancybox").fancybox({
		titleShow: true
	});
	$container.infinitescroll({
		navSelector  : '.pagination',  // selector for the paged navigation 
		nextSelector : '.next_page',  // selector for the NEXT link (to page 2)
		itemSelector : $photo_type,     // selector for all items you'll retrieve
		loading: {
				finishedMsg: '<em>No more images to load.</em>',
				msgText: "",
				img: '/assets/ajax-loader.png'
			}
		},
		// trigger Masonry as a callback
	function( newElements ) {
	  // hide new items while they are loading
	  var $newElems = $( newElements ).css({ opacity: 0 });
	  // ensure that images load before adding to masonry layout
	  $newElems.imagesLoaded(function(){
		// show elems now they're ready
		$newElems.animate({ opacity: 1 });
		// $container.masonry( 'appended', $newElems, true );
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
				client.on('complete', function(client, args){
					$('header').after('<div class="message success">');
					$('.message').fadeIn().html('<h3>Success!</h3><p>The text has been copied to your clipboard.</p>').delay(3000).fadeOut(300, function() { $(this).remove(); });
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
			$('form.edit_photo').submit(function(){
					$('header').after('<div class="message success"><h3>Success!</h3><p>The photos details have been updated.</p></div>');
					$('.message').delay(3000).fadeOut();
					$('#edit_form').dialog('close');
			});
	}
	);
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
		client.on('complete', function(client, args){
			$('header').after('<div class="message success">');
			$('.message').fadeIn().html('<h3>Success!</h3><p>The text has been copied to your clipboard.</p>').delay(3000).fadeOut(300, function() { $(this).remove(); });
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
	$('form.edit_photo').submit(function(){
			$('header').after('<div class="message success"><h3>Success!</h3><p>The photos details have been updated.</p></div>');
			$('.message').delay(3000).fadeOut();
			$('#edit_form').dialog('close');
	});

	$('#photo_image').change(function(e){
		if(window.File && window.FileList && window.FileReader){
			var files = e.target.files; //FileList object

			for(var i = 0; i < files.length; i++){
				var file = files[i];

				//Only pics
				if(!file.type.match('image'))
				continue;

				var picReader = new FileReader();

				picReader.addEventListener("load",function(e){

					var picFile = e.target;

					var photo_preview = '<div class="photo_preview">';
					var ajax_loader = '<div class="ajax-loader"><img src="/assets/ajax-loader.png" class="ajax-loader" /></div></div>';

					$('#photos').append(photo_preview+'<div class="uploadedImage" style="background-image: url('+picFile.result+'); opacity: 0.5;"></div>'+ajax_loader);
				
				});

				//Read the image
				picReader.readAsDataURL(file);
			}
		}
		else{
			console.log("Your browser does not support File API");
		}
	});
	
	$('#new_photo').fileupload({
		dataType: 'script',
		autoUpload: true,
		sequentialUploads: true,
		limitMultiFileUploadSize: 3,
	}).on('fileuploadadd', function (e, data) {
		//$('div#photos').masonry();
	}).on('fileuploadprocessalways', function (e, data) {
					var file, types;
					types = /(\.|\/)(gif|jpe?g|png)$/i;
					file = data.files[0];
					if (types.test(file.type) || types.test(file.name)) {
						return data.submit();
					} else {
						return alert("" + file.name + " is not a gif, jpeg, or png image file");
					};
	}).on('fileuploadprogressall', function (e, data) {
		$('#progress').fadeIn().css('display','inline-block');
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#progress .bar').css(
			'width',
			progress + '%'
		);
		$('#progress .bar').html(progress + '%');
	}).on('fileuploaddone', function (e) {
		$('.photo_preview').imagesLoaded(function(){
			//$('div#photos').masonry();
		})
	}).on('fileuploadstop', function (e) {
		console.log('Upload finished.');
		$('#progress').fadeOut();
		$('.photo_preview').imagesLoaded(function(){
			//$('div#photos').masonry();
		})
	}).on('fileuploadfail', function (e, data) {
		$.each(data.files, function (index, file) {
			var error = $('<span class="text-danger"/>').text('File upload failed.');
			$(data.context.children()[index])
				.append('<br>')
				.append(error);
		});
	});
	$('#photo_image').attr('name', 'photo[image]');
});