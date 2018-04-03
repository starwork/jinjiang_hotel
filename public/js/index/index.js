$(document).ready(function(){
	var caopanshou_bg = $('.caopanshou-bg')[0];
	var icon_hover = $('.icon_hover');
	var btn_arr = $('.btn_img');
	var li_hover = $('.content_ul li');
	li_hover.hover(function(){
		var index = $(this).index();
		for(var i=0; i<3; i++){
			li_hover.css({
			'background-color':'white',
			'color':'black'
		});
		}
		$(this).css({
			'background-color':'#1c2b48',
			'color':'white'
		});
	})
	
	var swiper = new Swiper('.swiper-container', {
      	pagination: {
        	el: '.swiper-pagination',
      	},
      	autoplay: true
    });
	var canAni_caopanshou = true;
	
	var icon_hover_arr = [
		['../../img/index/index/icon0.png','../../img/index/index/icon0_hover.png'],
		['../../img/index/index/icon1.png','../../img/index/index/icon1_hover.png'],
		['../../img/index/index/icon2.png','../../img/index/index/icon2_hover.png']
	];
	
	var equipmentW = window.screen.width;
	if(equipmentW > 768){
		$(window).scroll(function(){
			var caopanshou_top = caopanshou_bg.getBoundingClientRect().top;
			if(caopanshou_top <= 500 && canAni_caopanshou){
				$(".caopanshou-left").animate({left:'26%'},1000);
				$(".caopanshou-right").animate({left:'57%'},1000);
				canAni_caopanshou = false;
			}
		})
	}else{
		$(".caopanshou-left").animate({left:'26%'},1000);
		$(".caopanshou-right").animate({left:'57%'},1000);
		$('.xueyuan_say').prop('src','../../img/index/index/xueyuan_say2.png');
		var htmlstr = '<div class="row" style="margin-bottom: 6%;">';
        htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo0.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo1.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo2.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo3.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo4.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo5.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo6.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo7.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo8.png"/></div>';
		htmlstr += '<div class="col-xs-4 other_style"><img class="show_logo" src="../../img/index/index/logo9.png"/></div>';
        htmlstr += '</div>';
		$(".logo_wrap").html(htmlstr);
	}
	if(equipmentW > 768){
        $(window).scroll(function(){
            var caopanshou_top = caopanshou_bgs.getBoundingClientRect().top;
            if(caopanshou_top <= 500 && canAni_caopanshou){
                $(".caopanshou-lefts").animate({left:'26%'},1000);
                $(".caopanshou-rights").animate({left:'57%'},1000);
                canAni_caopanshou = false;
            }
        })
	}else{
        $(".caopanshou-lefts").animate({left:'26%'},1000);
        $(".caopanshou-rights").animate({left:'57%'},1000);
	}
	for(var i=0; i<icon_hover.length; i++){
		icon_hover.eq(i).hover(function(){
			$(this).prop('src',icon_hover_arr[i][1]);
		},function(){
			$(this).prop('src',icon_hover_arr[i][0]);
		})
	}
	
	btn_arr.click(function(){
		if(!$(this).index()){
			$('.table_img').prop('src','../../img/index/index/zijin.png');
		}else{
			$('.table_img').prop('src','../../img/index/index/xueyuan.png');
		}
	})
})