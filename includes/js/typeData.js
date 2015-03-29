
var typeData  = [];
var canadianTypeIndex = [];

function loadTypeData(dataLoadedCallback)
{
	// load aircraft type data
	$.getJSON( "../data/typeData.json", function(newTypeData)
	{
		typeData = newTypeData.types
		dataLoadedCallback(typeData);
	});
}


function getCanadianTypeIndex()
{
	if (canadianTypeIndex.length <= 0)
	{
		//create indexes
		$.each(typeData, function(key, val)
		{
			if (val.canadian)
			{
				canadianTypeIndex.push(val.id);
			}
		});
	}

	return canadianTypeIndex;
}


function getDataForType(acId)
{
    var returnType = null;

	$.each(typeData, function(key, thisType)
	{
		if (thisType.id == acId)
		{
			returnType = thisType;
            return;
		}
	});

    return returnType;
}
