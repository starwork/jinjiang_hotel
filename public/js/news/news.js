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

    //加盟咨询
    $(".menu-join").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(".nav_btn_m").toggleClass('nav_btn_open');
        $(".menu-m").toggleClass('menu-m-close');
        $("#logo-m").toggleClass("d_n");

        all_swiper.slideTo(6, 500, true);

        $(".indexpage7-up-right").css("opacity",1);
        $(".indexpage7-up-right").css("z-index",100);

    });

    //parent swiper
    var all_swiper = new Swiper('.all_swiper', {
        direction: 'vertical',
        mousewheel: true,
        slidesPerView : 'auto',
        slidesPerGroup: 1,
        // 如果需要分页器
        // pagination: {
        //     el: '.all_swiper-pagination',
        //     bulletClass: 'all_my-bullet',
        //     bulletActiveClass: 'all_my-bullet-active',
        //     clickable: true
        // },
        on: {
            init: function() {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            // slideChangeTransitionStart: function() {
            // 	if(this.activeIndex == 2){
            // 		$(".header").css("background-color","#ffffff");
            // 	}else{
            // 		$(".header").css("background-color","transparent");
            // 	}
            // },
            slideChangeTransitionEnd: function() {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画

            }
        }
    });

    $('.news-slide-btn1').click(function() {
        all_swiper.slideTo(1, 500, false); //切换到第一个slide，速度为1秒
    });
    $('.news-slide-btn2').click(function() {
        all_swiper.slideTo(2, 500, false); //切换到第一个slide，速度为1秒
    });

    //品牌活动swiper
    var mySwiper2 = new Swiper('.newspage-siwper2', {
        loop: true,
        slidesPerView : 3,
        slidesPerGroup : 3,
        nested: false,
        noSwiping : true,
        loop: false,
        // 如果需要分页器
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.newspage-siwper2-button-next',
            prevEl: '.newspage-siwper2-button-prev',
        }
    })

    $(".newspage-siwper2-button-top").click(function(){
    	mySwiper2.slideTo(0, 500, false);
    })

    //品牌资讯swiper
    var mySwiper3 = new Swiper('.newspage-siwper3', {
        loop: true,
        slidesPerView : 3,
        slidesPerGroup : 3,
        nested: false,
        noSwiping : true,
        loop: false,
        // 如果需要分页器
        // pagination: {
        //     el: '.swiper-pagination',
        // },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.newspage-siwper3-button-next',
            prevEl: '.newspage-siwper3-button-prev',
        }
    })

    $(".newspage-siwper3-button-top").click(function(){
    	mySwiper3.slideTo(0, 500, false);
    })


//    侧边栏
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
})