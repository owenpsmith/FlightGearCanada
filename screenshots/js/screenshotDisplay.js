
var mode = "";
var imageIndex = 0;
var imageElement = 0;
var $currentImage;
var interval;


var displayImageThumbnails = function()
{
console.log("displayImageThumbnails() - ENTER");
	var newHTML = "";

	$.each(images, function(key, thisImage)
	{
		newHTML += "<div class=\"thumbnail\">\n";
		newHTML +=     "<a href=\"" + thisImage.image + "\"><img src=\"" + thisImage.thumb + "\" /></a>\n";
		newHTML +=     "<p>" + thisImage.desc + "<\p>\n";
		newHTML += "</div>\n";
	});

	$('#thumbnails').html(newHTML);
}

var showNextImage = function()
{
	if (mode == "slideshow")
	{
		if (imageIndex < 0)
		{
			// initial display
			imageIndex = 0;
			imageElement = 2;
			$currentImage = $('#image2');
			$('#image1').css("opacity", 1);
			$('#image2').css("opacity", 0);
		}
		else
		{
			imageIndex++;
			if (imageIndex >= images.length)
			{
				imageIndex = 0;
			}
		}

		var newHTML = "";

		nextImage = images[imageIndex];

		newHTML += "<img id=\"slideshow\" src=\"" + nextImage.image + "\" />";

		if (imageElement == 1)
		{
			imageElement = 2;

			$('#image2').html(newHTML);
			$('#image2').animate({opacity:1}, {duration:1000});
		}
		else
		{
			imageElement = 1;

			$('#image1').html(newHTML);
			$('#image2').animate({opacity:0}, {duration:1000});
		}
	}
	else
	{
		clearInterval(interval);
	}
}



var displaySlideShow = function()
{
	var newHTML = "";

	imageIndex = -1;

	newHTML += "<div id='image1'>Hello 1</div>\n";
	newHTML += "<div id='image2'>Hello 2</div>\n";

	$thumbnailsTemp = $('#thumbnails');

	$thumbnailsTemp.html("");
	$thumbnailsTemp.html(newHTML);

	showNextImage();
	interval = setInterval(showNextImage, 5000);
}

// button handlers
$('#thumbsBtn').click(function()
{
	mode = "thumbnails";
	displayImageThumbnails();
});

$('#slidesBtn').click(function()
{
	mode = "slideshow";
	displaySlideShow();
});


// initialization
var dataLoadedCallback = function()
{
console.log("dataLoadedCallback() - ENTER");
	// default to view all by type
	displayImageThumbnails();
};

$(document).ready( function()
{
	loadData(dataLoadedCallback);
});