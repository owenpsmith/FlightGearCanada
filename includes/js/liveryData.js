
// data
var types              = [];
var liveries           = [];

// indexes
var liveryTypeIndex     = [];
var operatorIndex = [];
var authorIndex   = [];

var liveriesByType     = [];
var liveriesByOperator = [];
var liveriesByAuthor   = [];

function addModelData(livery)
{
	$.each(types, function(key, type)
	{
		if (type.id == livery.typeId)
		{
			livery.modelId     = type.id;
			livery.modelName   = type.modelName;
			livery.modelAuthor = type.author;
			livery.modelPath   = type.modelPath;
			livery.modelSetup  = type.setup;

			return;
		}
	});
}


function loadLiveryData(dataLoadedCallback)
{
	// load aircraft data
	loadTypeData(function(typeData)
	{
		types = typeData;

		types.sort(function (a, b)
		{
			var varA = a.modelName.toUpperCase();
			var varB = b.modelName.toUpperCase();
			return (varA < varB) ? -1 : (varA > varB) ? 1 : 0;
		});

		// load livery data
		$.getJSON( "../data/liveryData.json", function(liveryData)
		{
			liveries = liveryData.liveries;

			// populate type data into livery data
			$.each(liveries, function(key, val)
			{
				addModelData(val);
			});

			//create indexes
			$.each(liveries, function(key, val)
			{
				if (liveryTypeIndex.indexOf(val.modelName) == -1)
				{
					liveryTypeIndex.push(val.modelName);
				}
				if ((operatorIndex.indexOf(val.operator) == -1) &&
				    (val.operator != "other"))
				{
					operatorIndex.push(val.operator);
				}
				if (authorIndex.indexOf(val.author) == -1)
				{
					authorIndex.push(val.author);
				}
			});

			// sort indexes
			liveryTypeIndex.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});

			operatorIndex.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});
			// we want "other" to be at the end of the list for display
			operatorIndex.push("other");

			authorIndex.sort(function (a, b) {
				return a.toLowerCase().localeCompare(b.toLowerCase());
			});

			dataLoadedCallback();
		});
	});
}


function getLiveriesByType()
{
	if (liveriesByType.length <= 0)
	{
		// build livery heirarchy by type/operator
		$.each(liveryTypeIndex,     function(key, thisType)
		{
			var liveryGroup    = [];

			$.each(operatorIndex, function(key, thisOperator)
			{
				$.each(liveries,       function(key, thisLivery)
				{
					if ((thisLivery.modelName == thisType) &&
						(thisLivery.operator  == thisOperator))
					{
						// add to this group
						liveryGroup.push(thisLivery);
					}
				});
			});

			// add group to type array
			if (liveryGroup.length > 0)
			{
				liveriesByType.push(liveryGroup);
			}
		});
	}

	return liveriesByType;
}

function getLiveriesByOperator()
{
	if (liveriesByOperator.length <= 0)
	{
		// build livery heirarchy by operator/type
		$.each(operatorIndex, function(key, thisOperator)
		{
			var liveryGroup = [];

			$.each(liveryTypeIndex, function(key, thisType)
			{
				$.each(liveries, function(key, thisLivery)
				{
					if ((thisLivery.operator  == thisOperator) &&
						(thisLivery.modelName == thisType))
					{
						// add to this group
						liveryGroup.push(thisLivery);
					}
				});
			});

			// add group to type array
			if (liveryGroup.length > 0)
			{
				liveriesByOperator.push(liveryGroup);
			}
		});
	}

	return liveriesByOperator;
}

function getLiveriesByAuthor()
{
	if (liveriesByAuthor.length <= 0)
	{
		// build livery heirarchy by author
		$.each(authorIndex, function(key, thisAuthor)
		{
			var liveryGroup = [];

			$.each(liveries, function(key, thisLivery)
			{
				if (thisLivery.author == thisAuthor)
				{
					// add to this group
					liveryGroup.push(thisLivery);
				}
			});

			// add group to author array
			if (liveryGroup.length > 0)
			{
				liveriesByAuthor.push(liveryGroup);
			}
		});
	}

	return liveriesByAuthor;
}

function getTypeDataForAcId(acId)
{
    var returnType = null;

	$.each(types, function(key, thisType)
	{
		if (thisType.id == acId)
		{
			returnType = thisType;
            return;
		}
	});

    return returnType;
}

function doesTypeSupport3D(acId)
{
	var returnValue = false;

	$.each(liveries, function(key, thisLivery)
	{
		if ((thisLivery.typeId == acId) &&
		    (thisLivery.texture != ""))
		{
			returnValue = true;
            return;
		}
	});

    return returnValue;
}

function getLiveriesForType(acId)
{
	var liveriesForType = [];

	$.each(liveries, function(key, thisLivery)
	{
		if (thisLivery.typeId == acId)
		{
			liveriesForType.push(thisLivery);
		}
	});

    return liveriesForType;
}


