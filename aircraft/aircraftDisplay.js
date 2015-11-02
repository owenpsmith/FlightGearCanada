var toDisplay3D = [];

var displayAircraft = function()
{
	var newHTML = "";

	var typesToDisplay = getCanadianTypeIndex();

	$.each(typesToDisplay, function(key, thisType)
	{
		var typeHTML = "";
		var supports3D = false;

		var thisTypeData = getDataForType(thisType);

		typeHTML += "\t\t\t\t\t\t<li class=\"livery\"><div class=\"clearfix\">";
		typeHTML += "<img src=\"" + thisTypeData.thumb    + "\" /><div>\n";
		typeHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + thisTypeData.author   + "</p>\n";
		typeHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisTypeData.updated  + "</p>\n";
		typeHTML += "\t\t\t\t\t\t\t<br>\n";
		typeHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""    + thisTypeData.acLink + "\">Download</a>\n";
		if (doesTypeSupport3D(thisType) == true)
		{
			typeHTML += "\t\t\t\t\t\t\t<br>\n";
			typeHTML += "\t\t\t\t\t\t\t<br>\n";
			typeHTML += "\t\t\t\t\t\t\t<a class=\"link3D\" href=\"#\">View in 3D</a>\n";
		}
		typeHTML += "\t\t\t\t\t\t\t<p>" + thisTypeData.comment  + "</p>\n";
		typeHTML += "\t\t\t\t\t\t</div>\n";

		// data for generating 3D gallery upon selection
		typeHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
		typeHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisTypeData.id   + "</p>\n";
		typeHTML += "\t\t\t\t\t\t</div></div></li>\n";

		// livery header
		newHTML += "\n\t\t\t\t<li class=\"liveryGroup\">";
		if (thisTypeData.wishlist)
		{
			newHTML += "<img class=\"wishlist\" src=\"../includes/images/wishlist.png\"</img>";
		}
		else
		{
			newHTML += "<img class=\"wishlist\" src=\"../includes/images/wishlistblank.png\"</img>";
		}

		newHTML += "<h3>" + thisTypeData.modelName + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";

		// livery content
		newHTML += typeHTML;

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

var switchTo3DView = function($this)
{
	console.log("HELLO 1");

	$('section#welcome').hide();
	$('section#3D').show();
	$('section#3D canvas#canvas').show();
	$('section#3D div#text').show();
	$('section#3D div#close').show();
	$('section#3D div#gallery').show();

	toDisplay3D.length = 0;

	var $metaData = $this.parent().parent().children("div.metaData");

	console.log("element type = " + $this.parent().parent().attr("tagName"));

	var acId      = $metaData.children("p.acId").first().text();
	console.log("acId = " + acId);

	var liveriesForType = getLiveriesForType(acId);

	$.each(liveriesForType, function(key, thisLivery)
	{
		// append landing gear variant if applicable
		var modelPath = thisLivery.modelPath;
		if (thisLivery.gear != "")
		{
			// select the appropriate model file
			modelPath = modelPath.substring(0, modelPath.length - 3);

			modelPath += "_" + thisLivery.gear + ".ac";

//			if (livGear == "floats")
//			{
//				// tweak the POI to fit the floats into the view
//				typeData.setup.poi[1] -= 1;
//			}
		}

		var addToDisplay3D =
		{
			acName     : thisLivery.modelName,
			operator   : thisLivery.operator,
			thumbPath  : thisLivery.thumb,
			modelPath  : modelPath,
			liveryPath : thisLivery.texture,
			setup      : thisLivery.modelSetup,
			modAuthor  : thisLivery.modelAuthor,
			livAuthor  : thisLivery.author
		}

		if (thisLivery.texture != "")
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
		displayAircraft();
	});
});
