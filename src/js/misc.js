import $ from 'jquery';

window.jQuery = $;
window.$ = $;

require('jquery.rateit');
import Swiper from 'swiper';

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

if (DEBUG) {
	$.each($("div,svg,a,h1,h2,h3,h4,h5,h6"), function (index, item) {
		$(item).attr('style', "background-color: " + GetRandomColor());
	});
}

// Accordion
////////////////////////////////////////////////////////
$(".support__collapse").on("click",function() {
	$(".support__menu").toggleClass("support__menu--show");
});


// Countdown
////////////////////////////////////////////////////////
(function countDown() {
	const timer = [0, 1, 1, 45];
	const totalMsec = ((((((timer[0] * 24) + timer[1]) * 60) + timer[2]) * 60) + timer[3] ) * 1000;
  const endDate = new Date(Date.now() + totalMsec);
  const hoursEl = document.getElementsByClassName('countDown__digit--hours')[0];
  const minutesEl = document.getElementsByClassName('countDown__digit--minutes')[0];
  const secondsEl = document.getElementsByClassName('countDown__digit--seconds')[0];

  const setText = (el, val) => {
    const joined = `0${val}`;
    el.innerHTML = (val.length === 1) ? joined : val;
  };

  setText(hoursEl, timer[1]);
  setText(minutesEl, timer[2]);
  setText(secondsEl, timer[3]);

	const decrease = () => {
    const totalRem = Date.parse(endDate) - Date.parse(new Date());
    // const daysRem = Math.floor(totalRem / (1000 * 60 * 60 * 24));
    const hoursRem = Math.floor((totalRem / (1000 * 60 * 60)) % 24);
    const minutesRem = Math.floor((totalRem / 1000 / 60) % 60);
    const secondsRem = Math.floor((totalRem / 1000) % 60);

    if (hoursRem !== timer[1]) {
      timer[1] = hoursRem;
      setText(hoursEl, hoursRem);
    }

    if (minutesRem !== timer[2]) {
      timer[2] = minutesRem;
      setText(minutesEl, minutesRem);
    }

    if (totalRem > 0) {
      setText(secondsEl, secondsRem);
      setTimeout(decrease, 1000);
    } else {
      setText(secondsEl, secondsRem);
    }
  };

  decrease();
})();

// Slider
////////////////////////////////////////////////////////
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
	speed: 400,
	autoplay: 3000,
	centeredSlides: true,

    // pagination: '.swiper-pagination',
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    // scrollbar: '.swiper-scrollbar',
});

// Top Navigation
////////////////////////////////////////////////////////
var isTopnavOpacity = false;
if (isTopnavOpacity) {
	var offsetShow = $(document).height()*0.2,
	$button = $('.topnav');
	var classToggle = "topnav--opacity";

	$(window).scroll(function() {
		if ($(this).scrollTop() >= offsetShow) {
			$button.addClass(classToggle);
		} else {
			$button.removeClass(classToggle);
		}
	});
}

// Sidebar
////////////////////////////////////////////////////////
var sidebar = document.querySelector(".sidebar");
var overlay = document.querySelector(".sidebarOverlay");
var content = document.querySelector("body");

function ToggleSidebar() {
	sidebar.classList.toggle("sidebar--open");
	overlay.classList.toggle("sidebarOverlay--open");
	if (!content.getAttribute("style")) {
		content.setAttribute("style","overflow: hidden");
	}
	else {
		content.removeAttribute("style");
	}
}

document.querySelector('.topnav__toggleSidebar').addEventListener('click', function() {
	ToggleSidebar();
});

document.querySelector('.sidebarOverlay').addEventListener('click', function() {
	ToggleSidebar();
});

// RateIt rating
////////////////////////////////////////////////////////
$(document).ready(() => {
  $('.product__rating').rateit({
    max: 5,
    value: 4.5,
    step: 0.5,
    mode: "font",
    resetable: false
  });
});
