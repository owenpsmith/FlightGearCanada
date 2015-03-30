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
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><div class=\"clearfix\">";
			liveryHTML += "<img src=\"" + thisOperator.thumb + "\" /><div>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisOperator.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisOperator.author   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisOperator.updated  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<br>\n";

			if (thisOperator.zip == "included")
			{
				liveryHTML += "\t\t\t\t\t\t\t<p><b>Included with aircraft</b></p>\n";
			}
			else
			{
				liveryHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisOperator.zip + "\">Download</a>\n";
			}

			liveryHTML += "\t\t\t\t\t\t</div>\n";

			// data for generating 3D gallery upon selection
			liveryHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisType[0].modelId   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"operator\" >" + thisOperator.operator + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"thumbPath\">" + thisOperator.thumb    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livPath\"  >" + thisOperator.texture  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"modAuthor\">" + thisOperator.modelAuthor  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livAuthor\">" + thisOperator.author       + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livGear\"  >" + thisOperator.gear         + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></div></li>\n";

			if (thisOperator.texture != "")
			{
				supports3D = true;
			}
		});

		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3 class=\"liveryCount\">" + thisType.length + "</h3>";
		if (supports3D)
		{
			newHTML += "<a class=\"link3D\" href=\"#\">3D</a>";
		}
		else
		{
			newHTML += "<a class=\"link3DDisabled\" href=\"#\"></a>";
		}
		newHTML += "<h3>" + thisType[0].modelName + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += liveryHTML;

		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.link3D').click(function(e)
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
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><div class=\"clearfix\">";
			liveryHTML += "<img src=\""                                  + thisType.thumb + "\" /><div>\n";
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
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"modAuthor\">" + thisType.modelAuthor  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livAuthor\">" + thisType.author       + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livGear\"  >" + thisType.gear         + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></div></li>\n";

			if (thisType.texture != "")
			{
				supports3D = true;
			}
		});

		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3 class=\"liveryCount\">" + thisOperator.length + "</h3>";
		if (supports3D)
		{
			newHTML += "<a class=\"link3D\" href=\"#\">3D</a>";
		}
		else
		{
			newHTML += "<a class=\"link3DDisabled\" href=\"#\"></a>";
		}
		newHTML += "<h3>" + thisOperator[0].operator + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += liveryHTML;

		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.link3D').click(function(e)
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
			liveryHTML += "\t\t\t\t\t\t<li class=\"livery\"><div class=\"clearfix\">";
			liveryHTML += "<img src=\""                                  + thisLivery.thumb     + "\" /><div>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisLivery.modelName + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisLivery.operator  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisLivery.author    + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisLivery.updated   + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<br>\n";
			liveryHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisLivery.zip + "\">Download</a>\n";
			liveryHTML += "\t\t\t\t\t\t</div>\n";

			// data for generating 3D gallery upon selection
			liveryHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisLivery.modelId      + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"operator\" >" + thisLivery.operator     + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"thumbPath\">" + thisLivery.thumb        + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livPath\"  >" + thisLivery.texture      + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"modAuthor\">" + thisLivery.modelAuthor  + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livAuthor\">" + thisLivery.author       + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t\t<p class=\"livGear\"  >" + thisLivery.gear         + "</p>\n";
			liveryHTML += "\t\t\t\t\t\t</div></div></li>\n";

			if (thisLivery.texture != "")
			{
				supports3D = true;
			}
		});

		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3 class=\"liveryCount\">" + thisAuthor.length + "</h3>";
		if (supports3D)
		{
			newHTML += "<a class=\"link3D\" href=\"#\">3D</a>";
		}
		else
		{
			newHTML += "<a class=\"link3DDisabled\" href=\"#\"></a>";
		}
		newHTML += "<h3>" + thisAuthor[0].author + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += liveryHTML;

		// livery footer
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();

	$('.link3D').click(function(e)
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
		newHTML += "\t\t\t\t\t\t<li class=\"livery\"><div class=\"clearfix\">";
		newHTML += "<img src=\""                                  + thisLivery.thumb + "\" /><div>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Type    :</b>"            + thisLivery.modelName + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisLivery.operator  + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisLivery.author    + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisLivery.updated   + "</p>\n";
		newHTML += "\t\t\t\t\t\t\t<br>\n";
		newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisLivery.zip + "\">Download</a>\n";
		newHTML += "\t\t\t\t\t\t</div></div></li>\n";
	});

	$('#liveryContainer').html(newHTML);

	prepareList();
}


var switchTo3DView = function($this)
{
	$('section#welcome').hide();
	$('section#3D').show();
	$('section#3D canvas#canvas').show();
	$('section#3D div#text').show();
	$('section#3D div#close').show();
	$('section#3D div#gallery').show();

	toDisplay3D.length = 0;

	$this.next().next().children().each(function()
	{
		console.log($(this).get(0).tagName);

		var $metaData = $(this).children("div").children("div.metaData");

		var acId      = $metaData.children("p.acId").first().text();
		var operator  = $metaData.children("p.operator").first().text();
		var thumbPath = $metaData.children("p.thumbPath").first().text();
		var livPath   = $metaData.children("p.livPath").first().text();
		var modAuthor = $metaData.children("p.modAuthor").first().text();
		var livAuthor = $metaData.children("p.livAuthor").first().text();
		var livGear   = $metaData.children("p.livGear").first().text();

		var typeData = getTypeDataForAcId(acId);

		console.log(acId);

		// append landing gear variant if applicable
		var modelPath = typeData.modelPath;
		if (livGear != "")
		{
			// select the appropriate model file
			modelPath = modelPath.substring(0, modelPath.length - 3);

			modelPath += "_" + livGear + ".ac";

//			if (livGear == "floats")
//			{
//				// tweak the POI to fit the floats into the view
//				typeData.setup.poi[1] -= 1;
//			}
		}

		var addToDisplay3D =
		{
			acName     : typeData.modelName,
			operator   : operator,
			thumbPath  : thumbPath,
			modelPath  : modelPath,
			liveryPath : livPath,
			setup      : typeData.setup,
			modAuthor  : modAuthor,
			livAuthor  : livAuthor
		}

		if (livPath != "")
		{
			toDisplay3D.push(addToDisplay3D);
		}

//		if (livGear == "floats")
//		{
//			// tweak the POI to fit the floats into the view
//			typeData.setup.poi[1] += 1;
//		}
	});

	load3D(toDisplay3D);
}


var switchToLiveryView = function($this)
{
	$('section#3D').hide();
	$('section#3D canvas#canvas').hide();
	$('section#3D div#text').hide();
	$('section#3D div#close').hide();
	$('section#3D div#gallery').hide();
	$('section#3D div#gallery').empty();
	$('img.thumbnail').hide();
	$('section#welcome').show();
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

$('div#close img').click(function(e)
{
	switchToLiveryView($(this));
});

$(document).ready( function()
{
	$('#noJS').hide();

	// clear static content
	$('ul#liveryContainer').empty();

	// reveal elements which are only available if JS enabled
	$('.hide-no-js').removeClass("hide-no-js");

	loadLiveryData(function()
	{
		// default to view all by type
		displayLiveriesByType();
	});
});

