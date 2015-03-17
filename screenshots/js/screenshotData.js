
function loadScreenshotData(dataLoadedCallback)
{
	// load aircraft data
	$.getJSON( "js/screenshotData.json", function(screenshotData)
	{
		dataLoadedCallback(screenshotData.images);
	});
}

