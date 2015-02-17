
var liveries;
var types;
var operators;
var authors;

function loadLiveryData() {

	// load file
	$.getJSON( "data/liveryData.json", function(liveries) {

	// make sorted list of types
	$.each( data, function( key, val ) {
		// if item not in list, insert in alphabetical order
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
	
	// make sorted list of operators
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
	
	// make sorted list of authors
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
	
};


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
	})

	$('#collapseList').unbind('click').click( function() {
		$('.collapsed').removeClass('expanded');
		$('.collapsed').children('ul').hide();
	})
};




$(document).ready( function() {

	loadLiveryData();
	
	populateWidgets();
	
});