$().ready(function () {
	$("#card").flip({
		trigger: 'manual'
	});
});


$(".signup_link").click(function () {

	$(".signin_form").css('opacity', '0');
	$(".signup_form").css('opacity', '100');


	$("#card").flip(true);

	return false;
});

$("#unflip-btn").click(function () {

	$(".signin_form").css('opacity', '100');
	$(".signup_form").css('opacity', '0');

	$("#card").flip(false);

	return false;

});


if ($('#ddate')[0].type == "text") {
	$("#ddate").datepicker({
		onSelect: function (dateText) {
			$('#ddate').attr("placeholder", "");
		},
		dateFormat: 'yy-mm-dd'
	});
	$('#ddate').attr("placeholder", "Enter departure date");
}

