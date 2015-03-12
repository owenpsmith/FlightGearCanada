
function loadScreenshotData(dataLoadedCallback)
{
	// load aircraft data
	$.getJSON( "../includes/data/screenshotData.json", function(screenshotData)
	{
		dataLoadedCallback(screenshotData.images);
	});
}

