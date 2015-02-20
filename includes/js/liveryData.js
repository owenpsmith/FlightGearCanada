
// data
var types              = [];
var liveries           = [];

// indexes
var typeIndex     = [];
var operatorIndex = [];
var authorIndex   = [];


function addModelData(livery) {
	$.each(types, function(key, val) {
		if (val.id == livery.typeId)
		{
			livery.modelName  = val.modelName;
			livery.modelPath  = val.modelPath;
			livery.modelSetup = val.setup;
			return;
		}
	});
}

function loadData() {
	// load aircraft data
	$.getJSON( "data/aircraftData.json", function(typeData) {
		types = typeData.types;
		alert("aircraft data loaded: " + types[0].id);

		types.sort(function (a, b) {
			var varA = a.modelName.toUpperCase();
			var varB = b.modelName.toUpperCase();
			return (varA < varB) ? -1 : (varA > varB) ? 1 : 0;
		});
	});

	// load livery data
	$.getJSON( "data/liveryData.json", function(liveryData) {
		liveries = liveryData.liveries;
		alert("livery data loaded: " + liveries[0].operator);

		// populate type data into livery data
		$.each(liveries, function(key, val) {
			addModelData(val);
		});
		alert("model data added");

		//create indexes
		$.each(liveries, function(key, val) {
			if (typeIndex.indexOf(val.modelName) == -1) {
				typeIndex.push(val.modelName);
			}
			if (operatorIndex.indexOf(val.operator) == -1) {
				operatorIndex.push(val.operator);
			}
			if (authorIndex.indexOf(val.author) == -1) {
				authorIndex.push(val.author);
			}
		});
		alert("indexes created");

		// sort indexes
		typeIndex.sort();
		operatorIndex.sort();
		authorIndex.sort();
		alert("indexes sorted");
	});
}

function getLiveriesByType()
{
	// build livery heirarchy by type/operator, add filters later

	return liveries;
}

