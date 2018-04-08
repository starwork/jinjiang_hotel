<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/3/10 0010
 * Time: 15:45
 */

namespace app\index\controller;


use app\exception\Handler;
use think\Controller;
use think\Db;
use think\Request;

class Message extends Base
{
    public function message(){
        if(cookie('send_mail')){
            return Handler::fail('已收到您的请求，请勿频繁操作');
        }
        $post = Request::instance()->post();
        $data['name'] = $post['name'];
        $data['email'] = $post['email'];
        $data['tel'] = $post['tel'];
        $data['content'] = $post['content'];
        $res = Db::table('message')->insert($data);
        if($res){
            $mailbody['name']="<a style='font-size:16px;color:#000;font-family:微软雅黑;text-decoration:none;'>姓名:".$data['name']."</a><br/>";
            $mailbody['phone']="<a style='font-size:16px;color:#000;font-family:微软雅黑;text-decoration:none;'>电话:".$data['tel']."</a><br/>";
            $mailbody['email']="<a style='font-size:16px;color:#000;font-family:微软雅黑;text-decoration:none;'>邮箱:".$data['email']."</a><br/>";
            $mailbody['request']="<a style='font-size:16px;color:#000;font-family:微软雅黑;text-decoration:none;'>需求:".$data['content']."</a><br/>";
            $str=implode('',$mailbody);
            $res = send_mail($data['email'],$data['name'],$str);
            if($res){
                cookie('send_mail','hahaha',3600);
                return Handler::success('留言成功');
            }
        }
        return Handler::fail('留言失败，请再试一次');
    }
}