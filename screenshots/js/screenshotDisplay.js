
var displayImageThumbnails = function()
{
	var newHTML = "";

	$.each(images, function(key, thisImage)
	{
		newHTML += "\t\t\t\t<div class=\"thumbnail\"><a href=\"" + thisImage.image + "\"><img src=\"" + thisImage.thumb + "\" /></a></div>\n";
	});

	$('#welcome').html(newHTML);

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