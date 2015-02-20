

//				<li class="liveryGroup"><h3>Airbus A320</h3>
//					<ul>
//						<li class="livery"><img src="http://liveries.flightgear.org/thumbs/8.jpg" /><div>
//							<p><b>Operator:</b>Air Canada</p>
//							<p><b>Author:  </b>Liam Gathercole</p>
//							<p><b>Updated: </b>2010-01-08</p>
//							<br>
//							<a class="link" href="http://liveries.flightgear.org/download/Airbus/A320/ACA.zip">Download</a>
//						</div></li>
//					</ul>
//				</li>
var dataLoadedCallback = function()
{
	console.log("displayAllByType()");
	// default to view all by type
	var newHTML = ""

	var liveriesByType = getLiveriesByType();
	console.log("got liveries by type: " + liveriesByType.length);
	
	$.each(liveriesByType,     function(key, thisType)
	{
		console.log("Generating HTML for " + thisType[0].modelName);
		newHTML += "\t\t\t\t<li class=\"liveryGroup\"><h3>" + thisType[0].modelName + "</h3>\n";
		newHTML += "\t\t\t\t\t<ul>\n";
	
		$.each(thisType,     function(key, thisOperator)
		{
			console.log("Generating HTML for " + thisOperator.operator);
			newHTML += "\t\t\t\t\t\t<li class=\"livery\"><img src=\"" + thisOperator.thumb + "\" /><div>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Operator:</b>" + thisOperator.operator + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Author  :</b>" + thisOperator.author   + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<p><b>Updated :</b>" + thisOperator.updated  + "</p>\n";
			newHTML += "\t\t\t\t\t\t\t<br>\n";
			newHTML += "\t\t\t\t\t\t\t<a class=\"link\" href=\"" + thisOperator.zip + "\">Download</a>\n";
			newHTML += "\t\t\t\t\t\t</div></li>\n";
		});
		newHTML += "\t\t\t\t\t</ul>\n";
		newHTML += "\t\t\t\t</li>\n";
	});
	
	alert(newHTML);
	
	console.log("displaying liveries");
	$('#liveryContainer').html(newHTML);
	
	prepareList();
};


$(document).ready( function()
{
	loadData(dataLoadedCallback);
});