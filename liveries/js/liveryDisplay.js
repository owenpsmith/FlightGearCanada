

var displayLiveriesByType = function()
{
	var newHTML = "";

	var liveriesByType = getLiveriesByType();

	$.each(liveriesByType, function(key, thisType)
	{
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisType[0].modelName + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		$.each(thisType, function(key, thisOperator)
		{
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

	$('#liveryContainer').html(newHTML);

	prepareList();
}

var displayLiveriesByOperator = function()
{
	var newHTML = "";

	var liveriesByOperator = getLiveriesByOperator();

	$.each(liveriesByOperator, function(key, thisOperator)
	{
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisOperator[0].operator + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		$.each(thisOperator, function(key, thisType)
		{
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

	$('#liveryContainer').html(newHTML);

	prepareList();
}

var displayLiveriesByAuthor = function()
{
	var newHTML = "";

	var liveriesByAuthor = getLiveriesByAuthor();

	$.each(liveriesByAuthor, function(key, thisAuthor)
	{
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisAuthor[0].author + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		$.each(thisAuthor, function(key, thisLivery)
		{
			newHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisLivery.thumb + "\" /><div>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisLivery.modelName + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisLivery.operator  + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisLivery.author    + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisLivery.updated   + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<br>\n";
			newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisLivery.zip + "\">Download</a>\n";
			newHTML += "\t\t\t\t\t\t</div></li>\n";
		});
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();
}

var displayLiveriesByAll = function()
{
	var newHTML = "";

	$.each(liveries, function(key, thisLivery)
	{
		newHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisLivery.thumb + "\" /><div>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisLivery.modelName + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisLivery.operator  + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisLivery.author    + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisLivery.updated   + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<br>\n";
		newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisLivery.zip + "\">Download</a>\n";
		newHTML += "\t\t\t\t\t\t</div></li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();
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
	displayLiveriesByType();
};

$(document).ready( function()
{
	loadData(dataLoadedCallback);
});