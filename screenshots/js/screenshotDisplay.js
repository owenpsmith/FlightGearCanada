
var displayImageThumbnails = function()
{
	var newHTML = "";

	$.each(images, function(key, thisImage)
	{
		newHTML += "\t\t\t\t<div class=\"thumbnail\">\n";
		newHTML += "\t\t\t\t\t<a href=\"" + thisImage.image + "\"><img src=\"" + thisImage.thumb + "\" /></a>\n";
		newHTML += "\t\t\t\t\t<p>" + thisImage.desc + "<\p>\n";
		newHTML += "\t\t\t\t</div>\n";
	});

	$('#thumbnails').html(newHTML);
}


// button handlers
$('#byTypeBtn').click(function()
{
	displayLiveriesByType();
});

$('#byOperatorBtn').click(function()
{
	displayLiveriesByOperator();
});

$('#byAuthorBtn').click(function()
{
	displayLiveriesByAuthor();
});

$('#byAllBtn').click(function()
{
	displayLiveriesByAll();
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