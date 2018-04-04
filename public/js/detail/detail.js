$(function() {
	// nav 
    $(".nav_btn").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('nav_btn_open');
        $(".nav_ul").toggleClass('nav_ul_open');
    });

    var myScroll = new IScroll('#wrapper', {
        mouseWheel: true,
        scrollbars: true
    });
})