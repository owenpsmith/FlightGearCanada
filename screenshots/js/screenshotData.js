
// data
var images = [];

function loadData(dataLoadedCallback)
{
console.log("loadData() - ENTER");

	// load aircraft data
	$.getJSON( "data/screenshotData.json", function(screenshotData)
	{
		images = screenshotData.images;

		dataLoadedCallback();
	});
}

