
var imagesData = [];
var imageIndex = -1;
var imageElement = 0;


var displayImageThumbnails = function()
{
	var newHTML = "";

	$.each(images, function(key, thisImage)
	{
		newHTML += "<div class=\"thumbnail\">\n";
		newHTML +=     "<a href=\"images\\" + thisImage.id + ".jpg\"><img src=\"images\\thumbs\\" + thisImage.id + ".jpg\" /></a>\n";
//		newHTML +=     "<p>" + thisImage.desc + "<\p>\n";
		newHTML += "</div>\n";
	});

	$('section#thumbnailContainer').html(newHTML);

	$('section#thumbnailContainer').show();
	$('section#slideshowContainer').hide();
}


var displaySlideShow = function()
{
	$('section#slideshowContainer').show();
	$('section#thumbnailContainer').hide();
}


// button handlers
$('#thumbsBtn').click(function()
{
	displayImageThumbnails();
});


$('#slidesBtn').click(function()
{
	displaySlideShow();
});


$(document).ready( function()
{
	loadScreenshotData(function(imageData)
	{
		images = imageData;

		// default to view all by type
		displayImageThumbnails();
	});

	$('section#thumbnailContainer').show();
	$('section#slideshowContainer').hide();
});