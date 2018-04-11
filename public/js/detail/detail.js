$(function() {
	// nav 
    $(".nav_btn").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('nav_btn_open');
        $(".nav_ul").toggleClass('nav_ul_open');
    });
    $(".nav_btn_m").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('nav_btn_open');
        $(".menu-m").toggleClass('menu-m-close');
        $("#logo-m").toggleClass("d_n");
    });

    //wx
    $(".ce-btns-m2").on('click',function(event){
        event.preventDefault();
        console.log(22);
        $(".ce-btn-m2-code").css("display","block");
    });
    $(".ce-btn-m2-code").on('click',function(event){
        event.preventDefault();
        event.stopPropagation();
        $(this).css("display","none");
    });

    //返回顶部
    $(".ce-btn-m3").click(function() {
        $("html,body").animate({scrollTop:0}, 500);
    });

    var myScroll = new IScroll('#wrapper', {
        mouseWheel: true,
        scrollbars: true
    });
    myScroll.on('scrollEnd', function(){
        this.refresh();
    });

    //侧边栏
    $(".ce-btns").mouseover(function(){
        $(this).css({color:"#a55c3f"}).siblings().css({});
        $(".ce-btns .Alert").eq($(this).index()).show();
    });
    $(".ce-btns").mouseleave(function(){
        $(this).css({background:"",color:""});
        $(".ce-btns .Alert").eq($(this).index()).hide();
    });

    $(document).ready(function(){
        var h =$(document.body).outerHeight(true);
        if(h>700){
            $('.header').css({'background':'#fff','border-bottom':'1px solid rgba(0,0,0,0.1'})
        }
    });
});