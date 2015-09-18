$(document).ready(function()
{
	$("#date").datepicker();

	//$('#progressbar').progressbar({ value : 60 });

	$('#progressbar').progressbar();
	$('#progressbar').progressbar('option',
	{
		value : 30,
		disabled : false
	});
	$('')
	
});