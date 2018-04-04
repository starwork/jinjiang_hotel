$(function() {
    // nav 
    $(".nav_btn").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('nav_btn_open');
        $(".nav_ul").toggleClass('nav_ul_open');
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
            slideChangeTransitionStart: function() {
            	if(this.activeIndex == 2){
            		$(".header").css("background-color","#ffffff");
            	}else{
            		$(".header").css("background-color","transparent");
            	}
            },
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



})