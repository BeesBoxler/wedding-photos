jQuery(function() {
	var $container = $('section#photos');
	var $photo_type = '.single';
	$('section#photos').masonry({
		itemSelector: '.single',
		isFitWidth: true,
	});
	$('section#albums').hide();
	$('h1 a').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		if ($(this).attr("id") == "show_photos") {
			$('section#albums').hide();
			$('section#photos').show();
			$('section#album').masonry('destroy');
			$('section#photos').masonry({
				itemSelector: '.single',
				isFitWidth: true,
			});
			$container = $('section#photos');
			$photo_type = '.single';
		}
		if ($(this).attr("id") == "show_albums") {
			$('section#photos').hide();
			$('section#albums').show();
			$('section#photos').masonry('destroy');
			$('section#albums').masonry({
				itemSelector: '.album',
				isFitWidth: true,
			});
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
		$container.masonry( 'appended', $newElems, true );
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
	$('div#photos').masonry({
		itemSelector: '.photo_preview',
		isFitWidth: true,
	});

	// The number of errors
/*	var errMessage = 0;
	
	// Get all of the data URIs and put them in an array
	var dataArray = [];
	
	// Bind the drop event to the dropzone.
	$('#photo_image').bind('change', function(e) {

		console.log("Files added");
			
		// This variable represents the files that have been dragged
		// into the drop area
		var files = e.target.files;

		console.log("Files variable: " + files)
		
		// For each file
		$.each(files, function(index, file) {
						
			// Some error messaging
			if (!files[index].type.match('image.*')) {
				
				if(errMessage == 0) {
					$('#drop-files').append('Hey! Images only');
					++errMessage
				}
				else if(errMessage == 1) {
					$('#drop-files').append('Stop it! Images only!');
					++errMessage
				}
				else if(errMessage == 2) {
					$('#drop-files').append("Can't you read?! Images only!");
					++errMessage
				}
				else if(errMessage == 3) {
					$('#drop-files').append("Fine! Keep adding non-images.");
					errMessage = 0;
				}
				return false;
			}
						
			// Start a new instance of FileReader
			var fileReader = new FileReader();
			
			console.log("File Reader: " + fileReader);

				// When the filereader loads initiate a function
				fileReader.onload = (function(file) {
					
					return function(e) { 
						
						// Push the data URI into an array
						dataArray.push({name : file.name, value : this.result});
						
						// Move each image 40 more pixels across
						var image = this.result;
						
						console.log("Data Array: " + dataArray);
						
						// Just some grammatical adjustments
						if(dataArray.length == 1) {
							$('#upload-button span').html("1 file to be uploaded");
						} else {
							$('#upload-button span').html(dataArray.length+" files to be uploaded");
						}
						$('#dropped-files').append('<div class="image" style="display:inline-block; background: url('+image+'); background-size: cover;"> </div>'); 
					}; 
					
				})(files[index]);
				
			// For data URI purposes
			fileReader.readAsDataURL(file);
	
		});

		function restartFiles() {
		
			// This is to set the loading bar back to its default state
			$('#loading-bar .loading-color').css({'width' : '0%'});
			$('#loading').css({'display' : 'none'});
			$('#info').html(' ');
			// --------------------------------------------------------
			
			// We need to remove all the images
			// We'll also make the upload button disappear
			
			$('#new_photo').get(0).reset();
		
			// And finally, empty the array
			dataArray.length = 0;
			
			return false;
		}

		//$('#new_photo').submit();

		$("#progress").show();
		var totalPercent = 100 / dataArray.length;
		var x = 0;
		var y = 0;
		
		console.log("Total Percent: " + totalPercent);

		$.each(dataArray, function(index, file) {

			console.log("Starting Each");
			
			$.post('/photos', dataArray[index], function(data) {
			
				var fileName = dataArray[index].name;
				++x;

				$('#info').html('Uploading '+fileName);

				console.log("Uploading " + fileName);
				console.log("Uploaded " + totalPercent);
				
				// Change the bar to represent how much has loaded
				$('#progress .bar').css({'width' : totalPercent*(x)+'%'});
				
				if(totalPercent*(x) == 100) {
					// Show the upload is complete
					$('#info').html('Uploading Complete!');
					
					// Reset everything when the loading is completed
					setTimeout(restartFiles, 500);
					
				} else if(totalPercent*(x) < 100) {
					console.log("Uploaded " + totalPercent);
				
					$('#progress .bar').css({'width' : totalPercent*(x)+'%'});

					// Show that the files are uploading
					$('#info').html('Uploading '+fileName);
				
				}
				
				// Show a message showing the file URL.
				var dataSplit = data.split(':');
				if(dataSplit[1] == 'uploaded successfully') {
					var realData = '<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>';
					
					$('#info').append('<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>');
				
					// Add things to local storage 
					if(window.localStorage.length == 0) {
						y = 0;
					} else {
						y = window.localStorage.length;
					}
					
					window.localStorage.setItem(y, realData);
				
				} else {
					$('#info').append('<li><a href="images/'+data+'. File Name: '+dataArray[index].name+'</li>');
				}
				
			});
		});
		
		return false;
	});
		
	// Append the localstorage to the uploaded files section
	if(window.localStorage.length > 0) {
		$('#info').show();
		for (var t = 0; t < window.localStorage.length; t++) {
			var key = window.localStorage.key(t);
			var value = window.localStorage[key];
			// Append the list items
			if(value != undefined || value != '') {
				$('#info').append(value);
			}
		}
	} else {
		$('#info').hide();
	}*/



	$('#new_photo').fileupload({
		dataType: 'script',
		autoUpload: true,
		sequentialUploads: false,
	}).on('fileuploadadd', function (e, data) {
		$.each(data.files, function () {
			var $photo_preview = $('<div class="photo_preview"><img class="ajax-loader" src="/assets/ajax-loader.png" /></div>');
			$('div#photos').append($photo_preview).masonry( 'appended', $photo_preview );
		});
		$('div#photos').masonry();
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
			$('div#photos').masonry();
		})
	}).on('fileuploadstop', function (e) {
		console.log('Upload finished.');
		$('#progress').fadeOut();
		$('.photo_preview').imagesLoaded(function(){
			$('div#photos').masonry();
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