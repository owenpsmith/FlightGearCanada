
function loadTypeData(dataLoadedCallback)
{
	// load aircraft type data
	$.getJSON( "../includes/data/json/typeData.json", function(typeData)
	{
		dataLoadedCallback(typeData.types);
	});
}

