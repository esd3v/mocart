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
}

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
}

// Countdown
////////////////////////////////////////////////////////
(function CountDown()
{
	var setTime = [0,1,15,41];
	var setTotal = ((((((setTime[0]*24)+setTime[1])*60)+setTime[2])*60)+setTime[3])*1000;
	var endTime = new Date(Date.now() + setTotal);

	(function Decrease() {
		var delay = 0; // Prevent delay for the first execution
		setTimeout(function() {
			var remTime = Date.parse(endTime) - Date.parse(new Date());
			// var days = Math.floor(remTime / (1000 * 60 * 60 * 24));
			var hours = Math.floor((remTime / (1000 * 60 * 60)) % 24);
			var minutes = Math.floor((remTime / 1000 / 60) % 60);
			var seconds = Math.floor((remTime / 1000) % 60);

			// document.querySelector('.deals__days').innerHTML = days;
			document.querySelector('.countDown__digit--hours').innerHTML = ('0' + hours).slice(-2);
			document.querySelector('.countDown__digit--minutes').innerHTML = ('0' + minutes).slice(-2);
			document.querySelector('.countDown__digit--seconds').innerHTML = ('0' + seconds).slice(-2);
			if (delay <= 0) { // Next executions will have 1sec delay
				delay = 1000;
			}
			if (remTime > 0) {
				Decrease();
			}
		},delay);
	})();
})();
