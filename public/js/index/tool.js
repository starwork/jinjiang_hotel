function changeLanTo(lan) {
    $.ajax({
        url:"/index/language/change_lan",
        data:"lan="+lan,
        success:function (res) {
            if(res.state=="success"){
                location.reload();
            }
        }
    });
}

