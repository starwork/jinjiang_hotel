(function($){

    //数字递增
    $.fn.numberRock=function(options){
        var defaults={
            speed:24,
            count:100
        };
        var opts=$.extend({}, defaults, options);

        var div_by = 100,
            count=opts["count"],
            speed = Math.floor(count / div_by),
            sum=0,
            $display = this,
            run_count = 1,
            int_speed = opts["speed"];
        var int = setInterval(function () {
            if (run_count <= div_by&&speed!=0) {
                $display.text(sum=speed * run_count);
                run_count++;
            } else if (sum < count) {
                $display.text(++sum);
            } else {
                clearInterval(int);
            }
        }, int_speed);
    }

    //使用方法
    // $(".value").numberRock({
    //     speed:50,
    //     count:200
    // })
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
            $('.header').css({'background':'#fff'})
        }
    })

})(jQuery);