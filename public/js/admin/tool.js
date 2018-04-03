//ajax success
//res:接收的数据 url res.state成功跳转的链接
function ajax_success(res,url){
    if (res.state == 'success') {
        layer.msg(res.msg, {
            icon: 1,
            time: 1000 //1秒关闭（如果不配置，默认是3秒）
        }, function () {
            location.href = url;
        });
    } else {
        layer.alert(res.msg);
    }
}

//删除
function del(biaoqian,success_url) {
    layui.use('layer', function() {
        var layer = layui.layer;
        layer.confirm('确认删除?', {icon: 3, title: '提示'}, function (index) {
            // 确认发送ajax请求
            $.ajax({
                url: biaoqian.attr('href'),
                dataType: "json",
                success: function (res) {
                    ajax_success(res, success_url);
                }
            });
            layer.close(index);
        });
    });
    return false;
}

//设置最新或热销，
// sth 传入a标签
//type传入hot||new||....
function set_cond(sth,type) {
    var info = {};//commit设置，cancel取消
    info.field = "is_"+type;
    var tishi = {"hot":"热销","new":"最新","rec":"推荐",'verify':"审核"};
    //状态改变后的按钮文字
    var word;
    //如果状态为未
    if(sth.hasClass('layui-btn-normal')){
        info.info = 'commit';
        word = "已"+tishi[type];
    }else if(sth.hasClass('layui-btn-warm')){
        //如果状态为已经
        info.info = 'cancel';
        word = "未"+tishi[type];
    }
    if(info && word){
        layui.use('layer', function() {
            var layer = layui.layer;
            //发送推荐请求
            $.ajax({
                url: sth.attr('href'),
                dataType: "json",
                type: 'post',
                data: info,
                success: function (res) {
                    if (res.state == 'success') {
                        sth.toggleClass('layui-btn-normal layui-btn-warm');
                        sth.html(word);
                    } else {
                        layer.alert(res.msg);
                    }
                }
            });
        });
    }
    return false;
}
