function iphoneCheck( tel){
    var re=/^[1][34587]\d{9}$/;//手机号码验证正则表达式
    if(re.test(tel)){
        return true;
    }else{
        return false;
    }
}
//-----------------验证邮箱--------------------------/
function check( email_address ){
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if ( regex.test( email_address ) ){
        return true;
    }
    else
    {
        return false;
    }
}

$("#push_advice").submit(function () {
    if($("#name").val()==''){
        alert("姓名不能为空！\nPlease enter your name");
        return false;
    }
    if(!check($("#email").val())){
        alert("邮箱格式不正确!\nPlease enter your email");
        return false;
    }
    if($("#myText").val()==""){
        alert("手机号码不能为空！\nPlease enter your telephone number");
        return false;
    }
    // if(!iphoneCheck($("#myText").val())){
    //     alert("手机号码格式不正确！");
    //     return false;
    // }

    if($("#on").val()==''){
        alert('请输入您的建议！\nPlease enter your advice');
        return false;
    }
    var data = $('#push_advice').serializeArray();

    $.ajax({
        url: '/index/contact/publish',
        data: data,
        type: "POST",
        success: function (res) {
            if(res.state=='success'){
                alert(res.msg);
                $("#push_advice").reset();
            }
        }
    });
    return false;
});