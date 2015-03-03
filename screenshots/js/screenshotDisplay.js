
var mode = "";
var imageIndex = -1;
var imageElement = 0;
var $currentImage;
var interval = 0;


var displayImageThumbnails = function()
{
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

var showNextImage = function(ssDirection)
{
	console.log("showNextImage()");
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
			imageIndex += ssDirection;
			if (imageIndex >= images.length)
			{
				imageIndex = 0;
			}
			if (imageIndex < 0)
			{
				imageIndex = images.length - 1;
			}
		}

		var newHTML = "";

		nextImage = images[imageIndex];

		newHTML += "<img id=\"slideshow\" src=\"" + nextImage.image + "\" />";
		newHTML += "<p>" + nextImage.desc + "<\p>\n";

		if (imageElement == 1)
		{
			imageElement = 2;

			$('#image2').html(newHTML);
			$('#image2').animate({opacity:1}, {duration:1000});
			$('#image1').animate({opacity:0}, {duration:1000});
		}
		else
		{
			imageElement = 1;

			$('#image1').html(newHTML);
			$('#image1').animate({opacity:1}, {duration:1000});
			$('#image2').animate({opacity:0}, {duration:1000});
		}
	}
}

var ssTimerCallback = function()
{
	showNextImage(1);
}


var displaySlideShow = function()
{
	var newHTML = "";

	newHTML += "<div id='image1'></div>\n";
	newHTML += "<div id='image2'></div>\n";

	$thumbnailsTemp = $('#thumbnails');

	$thumbnailsTemp.html("");
	$thumbnailsTemp.html(newHTML);

	showNextImage(1);
	interval = setInterval(ssTimerCallback, 5000);
}

// button handlers
$('#thumbsBtn').click(function()
{
	if (mode == "slideshow")
	{
		clearInterval(interval);
		interval = 0;
	}

	mode = "thumbnails";
	displayImageThumbnails();
});

$('#slidesBtn').click(function()
{
	mode = "slideshow";
	displaySlideShow();
});


$('#prevBtn').click(function()
{
	showNextImage(-1);
});

$('#playPauseBtn').click(function()
{
	if (interval != 0)
	{
		clearInterval(interval);
		interval = 0;
	}
	else
	{
		showNextImage(1);
		interval = setInterval(ssTimerCallback, 5000);
	}
});

$('#nextBtn').click(function()
{
	showNextImage(1);
});


// initialization
var dataLoadedCallback = function()
{
	// default to view all by type
	displayImageThumbnails();
};

$(document).ready( function()
{
	loadData(dataLoadedCallback);
});