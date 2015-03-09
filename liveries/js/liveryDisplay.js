var toDisplay3D = [];

var displayLiveriesByType = function()
{
	var newHTML = "";

	var liveriesByType = getLiveriesByType();

	$.each(liveriesByType, function(key, thisType)
	{
		var liveryHTML = ""
		var supports3D = false;

		$.each(thisType, function(key, thisOperator)
		{
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisOperator.thumb + "\" /><div>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisOperator.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisOperator.author   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisOperator.updated  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<br>\n";
			liveryHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisOperator.zip + "\">Download</a>\n";
			liveryHTML += "\t\t\t\t\t\t</div>\n";

			// data for generating 3D gallery upon selection
			liveryHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisType[0].modelId   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"operator\" >" + thisOperator.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"thumbPath\">" + thisOperator.thumb    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livPath\"  >" + thisOperator.texture  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></li>\n";

			if (thisOperator.texture != "")
			{
				supports3D = true;
			}
		});
		
		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisType[0].modelName + " (" + thisType.length + ")</h3>\n";
		if (supports3D)
		{
			newHTML += "<a class=\"3DLink\" href=\"" + "\">View in 3D</a>\n";
		}
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += liveryHTML;
		
		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.3DLink').click(function(e)
	{
		e.preventDefault();
		
		switchTo3DView($(this));
	});
}

var displayLiveriesByOperator = function()
{
	var newHTML = "";

	var liveriesByOperator = getLiveriesByOperator();

	$.each(liveriesByOperator, function(key, thisOperator)
	{
		var liveryHTML = ""
		var supports3D = false;

		$.each(thisOperator, function(key, thisType)
		{
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisType.thumb + "\" /><div>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisType.modelName + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisType.author    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisType.updated   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<br>\n";
			liveryHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisType.zip + "\">Download</a>\n";
			liveryHTML += "\t\t\t\t\t\t</div>\n";
			
			// data for generating 3D gallery upon selection
			liveryHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisType.modelId  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"operator\" >" + thisType.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"thumbPath\">" + thisType.thumb    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livPath\"  >" + thisType.texture  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></li>\n";

			if (thisType.texture != "")
			{
				supports3D = true;
			}
		});
		
		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisOperator[0].operator + " (" + thisOperator.length + ")</h3>\n";
		if (supports3D)
		{
			newHTML += "<a class=\"3DLink\" href=\"" + "\">View in 3D</a>\n";
		}
		newHTML += "\t\t\t\t\t<ul>\n";
		
		// livery content
		newHTML += liveryHTML;
		
		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.3DLink').click(function(e)
	{
		e.preventDefault();
		
		switchTo3DView($(this));
	});
}

var displayLiveriesByAuthor = function()
{
	var newHTML = "";

	var liveriesByAuthor = getLiveriesByAuthor();

	$.each(liveriesByAuthor, function(key, thisAuthor)
	{
		var liveryHTML = ""
		var supports3D = false;

		$.each(thisAuthor, function(key, thisLivery)
		{
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisLivery.thumb     + "\" /><div>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisLivery.modelName + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisLivery.operator  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisLivery.author    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisLivery.updated   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<br>\n";
			liveryHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisLivery.zip + "\">Download</a>\n";
			liveryHTML += "\t\t\t\t\t\t</div>\n";

			// data for generating 3D gallery upon selection
			liveryHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisLivery.modelId  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"operator\" >" + thisLivery.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"thumbPath\">" + thisLivery.thumb    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livPath\"  >" + thisLivery.texture  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></li>\n";
			
			if (thisLivery.texture != "")
			{
				supports3D = true;
			}
		});
		
		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisAuthor[0].author + " (" + thisAuthor.length + ")</h3>\n";
		if (supports3D)
		{
			newHTML += "<a class=\"3DLink\" href=\"" + "\">View in 3D</a>\n";
		}
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += liveryHTML;
		
		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.3DLink').click(function(e)
	{
		e.preventDefault();
		
		switchTo3DView($(this));
	});
}

var displayLiveriesByAll = function()
{
	var newHTML = "";

	newHTML += "\t\t\t\t\t\t<h3>All Liveries (" + liveries.length + ")</h3>\n";

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


var switchTo3DView = function($this)
{
	$('section#welcome').hide();
	$('section#3D').show();

	$this.next().children().each(function()
	{ 
		var $metaData = $(this).children("div.metaData");

		var acId      = $metaData.children("p.acId").first().text();
		var operator  = $metaData.children("p.operator").first().text();
		var thumbPath = $metaData.children("p.thumbPath").first().text();
		var livPath   = $metaData.children("p.livPath").first().text();

		var typeData = getTypeDataForAcId(acId);

		var addToDisplay3D =
		{
			acName     : typeData.modelName,
			operator   : operator,
			thumbPath  : thumbPath,
			modelPath  : typeData.modelPath,
			liveryPath : livPath,
			setup      : typeData.setup   
		}
		
		if (addToDisplay3D.liveryPath != "")
		{
			toDisplay3D.push(addToDisplay3D);
		}
	});

	load3D(toDisplay3D);
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
	$('section#3D').hide();
	loadData(dataLoadedCallback);
});