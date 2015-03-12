
function loadScreenshotData(dataLoadedCallback)
{
	// load aircraft data
	$.getJSON( "../includes/data/json/screenshotData.json", function(screenshotData)
	{
		dataLoadedCallback(screenshotData.images);
	});
}

