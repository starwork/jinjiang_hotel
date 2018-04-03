<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/3/2 0002
 * Time: 9:30
 */

namespace app\admin\controller;


use app\exception\Handler;
use think\Controller;
use think\Db;
use think\Request;

class Login extends Controller
{
//    登录界面
    public function login()
    {
        return $this->fetch();
    }

//    登录处理
    public function do_login(){
        $map = Request::instance()->post();
        $info = Db::table('admin')->where($map)->find();
        if($info){
            session('username',$map['username']);
            return Handler::success('登陆成功');
        }
        return Handler::fail('账号或者密码不正确');
    }

//    注销
    public function logout(){
        if(session('username')){
            session('username',null);
        }
        $this->redirect('admin/login/login');
    }
}