
// data
var types              = [];
var liveries           = [];

// indexes
var typeIndex     = [];
var operatorIndex = [];
var authorIndex   = [];

function addModelData(livery) 
{
	$.each(types, function(key, val) 
	{
		if (val.id == livery.typeId)
		{
			livery.modelName  = val.modelName;
			livery.modelPath  = val.modelPath;
			livery.modelSetup = val.setup;
			return;
		}
	});
}

function loadData(dataLoadedCallback) 
{
	console.log("loadData()");
	
	// load aircraft data
	$.getJSON( "data/aircraftData.json", function(typeData) 
	{
		console.log("typeData loaded");
		types = typeData.types;

		types.sort(function (a, b)
		{
			var varA = a.modelName.toUpperCase();
			var varB = b.modelName.toUpperCase();
			return (varA < varB) ? -1 : (varA > varB) ? 1 : 0;
		});
		
		// load livery data
		$.getJSON( "data/liveryData.json", function(liveryData)
		{
			console.log("liveryData loaded");
			liveries = liveryData.liveries;

			// populate type data into livery data
			$.each(liveries, function(key, val)
			{
				console.log("adding livery " + val.operator);
				addModelData(val);
			});

			//create indexes
			$.each(liveries, function(key, val) 
			{
				if (typeIndex.indexOf(val.modelName) == -1) 
				{
					typeIndex.push(val.modelName);
				}
				if (operatorIndex.indexOf(val.operator) == -1) 
				{
					operatorIndex.push(val.operator);
				}
				if (authorIndex.indexOf(val.author) == -1) 
				{
					authorIndex.push(val.author);
				}
			});

			// sort indexes
			typeIndex.sort();
			operatorIndex.sort();
			authorIndex.sort();
			console.log("load data complete 1");
			
			dataLoadedCallback();
		});
	});
}


function getLiveriesByType()
{
	console.log("getLiveriesByType()");

	// build livery heirarchy by type/operator
	var liveriesByType = [];
	var liveryGroup    = [];
	
	$.each(typeIndex,     function(key, thisType) 
	{
		// clear group array
		liveryGroup.length = 0;
		
		$.each(operatorIndex, function(key, thisOperator)
		{
			$.each(liveries,       function(key, thisLivery)
			{
				if ((thisLivery.modelName == thisType) &&
				    (thisLivery.operator  == thisOperator))
				{
					// add to this group
					liveryGroup.push(thisLivery);
					console.log("added " + thisType + ":" + thisOperator);
				}
			});
		});
		
		// add group to type array
		if (liveryGroup.length > 0)
		{
			liveriesByType.push(liveryGroup);
		}
	});

	return liveriesByType;
}

