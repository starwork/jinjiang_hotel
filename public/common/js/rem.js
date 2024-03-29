// JavaScript Document
var calculate_size = function () {
		var BASE_FONT_SIZE = 100, docEl = document.documentElement, clientWidth = docEl.clientWidth;
			if (clientWidth) {
				docEl.style.fontSize = BASE_FONT_SIZE * (clientWidth / 1920) + 'px';
			}
		};
		// Abort if browser does not support addEventListener
		if (document.addEventListener) {
			var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
			window.addEventListener(resizeEvt, calculate_size, false);
			document.addEventListener('DOMContentLoaded', calculate_size, false);
			calculate_size();
		}