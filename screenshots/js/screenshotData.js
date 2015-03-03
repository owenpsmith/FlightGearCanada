
// data
var images = [];

function loadData(dataLoadedCallback)
{
	// load aircraft data
	$.getJSON( "data/screenshotData.json", function(screenshotData)
	{
		images = screenshotData.images;

		dataLoadedCallback();
	});
}

