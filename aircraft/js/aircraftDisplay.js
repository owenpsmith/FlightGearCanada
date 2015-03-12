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

		typeHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisTypeData.modelName + "\" /><div>\n";
//		typeHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>"            + thisOperator.operator + "</p>\n";
		typeHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>"            + "thisTypeData.author"  + "</p>\n";
//		typeHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>"            + thisOperator.updated  + "</p>\n";
//		typeHTML += "\t\t\t\t\t\t\t<br>\n";
//		typeHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\""      + thisOperator.zip + "\">Download</a>\n";
		typeHTML += "\t\t\t\t\t\t</div>\n";

		// data for generating 3D gallery upon selection
		typeHTML += "\t\t\t\t\t\t<div class=\"metaData\">\n";
		typeHTML += "\t\t\t\t\t\t\t<p class=\"acId\"     >" + thisType[0].modelId   + "</p>\n";
		typeHTML += "\t\t\t\t\t\t</div></li>\n";

//			if (thisOperator.texture != "")
//			{
//				supports3D = true;
//			}

		// livery header
		newHTML += "\t\t\t\t<li class=\"liveryGroup\">";
		if (supports3D)
		{
			newHTML += "<a class=\"link3D\" href=\"#\">3D</a>";
		}
		else
		{
			newHTML += "<a class=\"link3DDisabled\" href=\"#\"></a>";
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
	$('section#welcome').hide();
	$('section#3D').show();
	$('section#3D div#gallery').show();
	$('section#3D div#text').show();

	$this.next().next().children().each(function()
	{

		var $metaData = $(this).children("div.metaData");

		var acId      = $metaData.children("p.acId").first().text();
		var operator  = $metaData.children("p.operator").first().text();
		var thumbPath = $metaData.children("p.thumbPath").first().text();
		var livPath   = $metaData.children("p.livPath").first().text();
		var modAuthor = $metaData.children("p.modAuthor").first().text();
		var livAuthor = $metaData.children("p.livAuthor").first().text();
		var livGear   = $metaData.children("p.livGear").first().text();

		var typeData = getTypeDataForAcId(acId);

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


$(document).ready( function()
{
	loadLiveryData(function()
	{
		displayAircraft();
	});
});
