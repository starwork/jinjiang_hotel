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
        // 如果需要分页器
        pagination: {
            el: '.all_swiper-pagination',
            bulletClass: 'all_my-bullet',
            bulletActiveClass: 'all_my-bullet-active',
            clickable: true
        },
        on: {
            init: function() {
                swiperAnimateCache(this); //隐藏动画元素 
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function() {
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //数字递增
                if ($(".var-num1").text() > 0) {
                    $(".var-num1").text(0);
                }
                if ($(".var-num2").text() > 0) {
                    $(".var-num2").text(0);
                }
                if (this.activeIndex == 3) {
                    $(".var-num1").numberRock({
                        speed: 10,
                        count: 138
                    });
                    $(".var-num2").numberRock({
                        speed: 10,
                        count: 80
                    });
                }
            }
        }
    });

    //swiper1
    // $(window).resize(function(event) {
    /* Act on the event */
    var swiper1 = new Swiper('.swiper1', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: 3000,
        preloadImages: true,
        noSwiping: false,
        pagination: {
            el: '.swiper1-swiper-pagination',
            clickable: true,
        },
        on: {
            progress: function(progress) {
                var nowwidth = this.slides.eq(this.activeIndex)[0]["offsetWidth"]; //设置响应式
                //progress是0到1
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    translate = slideProgress * modify * (nowwidth / 2) + 'px'; // 设置响应式
                    scale = 1 - Math.abs(slideProgress) / 6;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }


    });


    //swiper2
    var mySwiper2 = new Swiper('.swiper2', {
        loop: true,
        nested: true,
        // 如果需要分页器
        pagination: {
            el: '#swiper2-pagination',
            clickable: true,
        }
    })

    //swiper3
    var mySwiper2 = new Swiper('.swiper3', {
        loop: true,
        nested: true,
        // 如果需要分页器
        pagination: {
            el: '#swiper3-pagination',
            clickable: true,
        }
    })

    //stop submit
    $(".submit").on("click", function(e) {
        e.preventDefault();
    });

    //error 
    $(".f-text").on("click focus", function() {
        var this_ = $(this);
        this_.prev().animate({
            "left": "-80px"
        }, "0.5s")

    });
    $(".f-text").on("blur", function() {
        var this_ = $(this);
        if (this_.val() == "") {
            this_.prev().removeClass("hide")
            this_.prev().animate({
                "left": "0px"
            }, "0.5s")
        } else {
            this_.prev().addClass("hide")
        }
    });

    $("#request").on("keydown", function(e) {
        e = e || window.event;
        if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 20) {
            var html = this.value;
            var count = 1;
            html.replace(/\n/g, function(w) {
                count++
            })
            this.style.height = count * 20 + "px"
        }

    })

    $(".mobile_need").on("click", function() {
        $(".touch_right").css({
            "display": "flex"
        });
        $("footer").hide();
    })

    //错误提示
    var show_info = function(id, t) {
        var this_ = $(id)
        this_.prev().css("color", "red")
        this_.parent().css("border-color", "red")

        if (t) {
            this_.prev().css("color", "#89BF22")
            this_.parent().css("border-color", "#89BF22")
        }
    }

    // 验证
    var check_name = function() {
        if ($("#name").val().length <= 0) {
            show_info("#name")
            return false;
        }
        show_info("#name", true)
        return true;
    }
    var check_phone = function() {
        var reg = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/
        var num = $("#phone").val();

        if (!reg.test(num)) {
            show_info("#phone")
            return false
        }
        show_info("#phone", true)
        return true
    }
    var check_email = function() {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!reg.test($("#email").val())) {
            show_info("#email")
            return false
        }
        show_info("#email", true)
        return true
    }
    var check_text = function() {
            if ($("#request").val().length <= 0) {
                show_info("#request")
                return false;
            }
            show_info("#request", true)
            return true;
        }
        // 表单验证
    function require() {
        return check_name() && check_phone() && check_email() && check_text()
    }

});