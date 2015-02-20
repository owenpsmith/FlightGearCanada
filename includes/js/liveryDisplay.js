

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

	loadData();

	//populateWidgets();

});