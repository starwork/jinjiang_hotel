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
        // $("#logo-m").toggleClass("d_n");
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
    $(".ce-btn-m2-code img").on('click',function(event){
        event.preventDefault();
        event.stopPropagation();
    });

    //tab
    $(".news_m_tab1").on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $(".news_m_tab2").toggleClass("active");

        $(".news_m_con2").css("display","none");
        $(".news_m_con1").css("display","block");
    });
    $(".news_m_tab2").on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass("active");
        $(".news_m_tab1").toggleClass("active");

        $(".news_m_con1").css("display","none");
        $(".news_m_con2").css("display","block");
    });

    //返回顶部
    $(".ce-btn-m3").click(function() {
        $("html,body").animate({scrollTop:0}, 500);
    });

    //流加载
    $.get('/index/activity/count', function(res){
        var allactpage = Math.ceil(res.data/3);
        layui.use('flow', function(){
            var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
            var flow = layui.flow;
            flow.load({
                elem: '.news_m_con1' //指定列表容器
                ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
                    var lis = [];
                    //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
                    $.get('/index/activity/page/page/'+page, function(res){
                        //假设你的列表返回在data集合中
                        layui.each(res.data, function(index, item){
                            lis.push('<div class="news_m_card">'+
                                '<a href="/index/activity/detail/id/' + item.id + '.html">'+
                                '<h3>' + item.title + '</h3>'+
                            '<img src="/' + item.cover_img + '" alt="">'+
                            '<div class="m_card_addr">'+
                            '<div class="m_card_addr1">' + item.location + '</div>'+
                            '<div class="m_card_addr2">' + item.time.year + '-' + item.time.month + '-' + item.time.day + '</div>'+
                            '</div>'+
                            '<div class="m_card_intro">' + item.content + '</div>'+
                                '</a>'+
                            '</div>');
                        });
                        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                        next(lis.join(''), page < allactpage);
                    });
                }
            });
        });
    });
    $.get('/index/info/count', function(res){
        var allinfopage = Math.ceil(res.data/3);
        layui.use('flow', function(){
            var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
            var flow = layui.flow;
            flow.load({
                elem: '.news_m_con2' //指定列表容器
                ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
                    var lis = [];
                    //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
                    $.get('/index/info/page/page/'+page, function(res){
                        //假设你的列表返回在data集合中
                        layui.each(res.data, function(index, item){
                            lis.push('<div class="news_m_card">'+
                                '<a href="/index/info/detail/id/' + item.id + '.html">'+
                                '<h3>' + item.title + '</h3>'+
                                '<img src="/' + item.cover_img + '" alt="">'+
                                '<div class="m_card_addr">'+
                                '<div class="m_card_addr2">' + item.time.year + '-' + item.time.month + '-' + item.time.day + '</div>'+
                                '</div>'+
                                '<div class="m_card_intro">' + item.content + '</div>'+
                                '</a>'+
                                '</div>');
                        });
                        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                        next(lis.join(''), page < allinfopage);
                    });
                }
            });
        });
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