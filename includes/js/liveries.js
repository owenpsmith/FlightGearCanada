
// data
var types     = [];
var liveries  = [];

// indexes
var operators = [];
var authors   = [];

function loadData() {
	alert("load aircraft data");
	// load aircraft type data
	$.getJSON( "data/aircraftData.json", function(typeData) {
		types = typeData.types;
		alert("aircraft data loaded: " + types[0].id);
		types.sort(function (a, b) {
			var varA = a.modelName.toUpperCase();
			var varB = b.modelName.toUpperCase();
			return (varA < varB) ? -1 : (varA > varB) ? 1 : 0;
		});
	});

	alert("load livery data");
	// load livery data
	$.getJSON( "data/liveryData.json", function(liveries) {
		alert("livery data loaded");

		//create indexes
		$.each(liveries, function(key, val) {
			if (operators.indexOf(val.operator) == -1) {
				operators.push(val.operator);
			}
			if (authors.indexOf(val.author) == -1) {
				authors.push(val.author);
			}
		});

		// sort indexes
		operators.sort();
		authors.sort();
	});

//	alert("operators = " + operators);
//	alert(authors);
}


function populateWidgets() {

	// Callbacks
	$('#expandList').click( function() {
		$('.collapsed').addClass('expanded');
		$('.collapsed').children('ul').show();
	})

	$('#collapseList').click( function() {
		$('.collapsed').removeClass('expanded');
		$('.collapsed').children('ul').hide();
	})

	// populate pull down selectors

	// default to view all by type
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
};


function displayAllByType() {

	// default to view all by type

	// Callbacks
	$('#expandList').unbind('click').click( function() {
		$('.collapsed').addClass('expanded');
		$('.collapsed').children('ul').show();
	});

	$('#collapseList').unbind('click').click( function() {
		$('.collapsed').removeClass('expanded');
		$('.collapsed').children('ul').hide();
	});
};


$(document).ready( function() {
	alert("ready");

	loadData();

	//populateWidgets();

});