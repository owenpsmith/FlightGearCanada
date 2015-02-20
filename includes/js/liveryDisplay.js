

var displayLiveriesByType = function()
{
	var newHTML = ""

	var liveriesByType = getLiveriesByType();
	console.log("got liveries by type: " + liveriesByType.length);
	
	$.each(liveriesByType,     function(key, thisType)
	{
		console.log("Generating HTML for "                  + thisType[0].modelName);
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisType[0].modelName + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";
	
		$.each(thisType,     function(key, thisOperator)
		{
			console.log("Generating HTML for " + thisOperator.operator);
			newHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisOperator.thumb + "\" /><div>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisOperator.operator + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisOperator.author   + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisOperator.updated  + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<br>\n";
			newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisOperator.zip + "\">Download</a>\n";
			newHTML += "\t\t\t\t\t\t</div></li>\n";
		});
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});
	
	console.log("displaying liveries");
	$('#liveryContainer').html(newHTML);
	
	prepareList();
}

var displayLiveriesByOperator = function()
{
	var newHTML = ""

	var liveriesByOperator = getLiveriesByOperator();
	console.log("got liveries by operator: " + liveriesByOperator.length);
	
	$.each(liveriesByOperator,     function(key, thisOperator)
	{
		console.log("Generating HTML(2) for next Operator");
		
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisOperator[0].operator + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";
	
		$.each(thisOperator,     function(key, thisType)
		{
			console.log("Generating HTML(2) for " + thisType.operator + " : " + thisType.modelName);
			
			newHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisType.thumb + "\" /><div>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisType.modelName + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisType.author    + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisType.updated   + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<br>\n";
			newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisType.zip + "\">Download</a>\n";
			newHTML += "\t\t\t\t\t\t</div></li>\n";
		});
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});
	
	console.log("displaying liveries");
	$('#liveryContainer').html(newHTML);
	
	prepareList();
}

var dataLoadedCallback = function()
{
	console.log("displayAllByType()");
	
	// default to view all by type
	//displayLiveriesByType();
	displayLiveriesByOperator();
};


$(document).ready( function()
{
	loadData(dataLoadedCallback);
});