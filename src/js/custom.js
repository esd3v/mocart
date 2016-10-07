// Misc
////////////////////////////////////////////////////////
var DEBUG = 0;

function GetRandomColor() {
	var length = 6;
	var chars = '0123456789ABCDEF';
	var hex = '#';
	while(length--) {
		hex += chars[(Math.random() * 16) | 0];
	}
	return hex;
};

// Accordion
////////////////////////////////////////////////////////
$(".support__collapse").on("click",function() {
	$(".support__menu").toggleClass("support__menu--show");
});

// SVG Polyfill
////////////////////////////////////////////////////////
$(document).ready(function () {
	svg4everybody({});
});

if (DEBUG) {
	$.each($("div,svg,a"), function (index, item) {
		$(item).attr('style', "background-color: " + GetRandomColor());
	});
};
