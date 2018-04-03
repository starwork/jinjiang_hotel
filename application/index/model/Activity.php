<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 16:43
 */

namespace app\index\model;


use think\Model;

class Activity extends Model
{
//    字符串返回时间戳格式
    public function getTimeAttr($value)
    {
        return strtotime($value);
    }

//    内容截取
    public function getContentAttr($value)
    {
        $value =preg_replace("/<.*?>/",'',$value);
        $len = mb_strlen($value);
        if($len>80){
            $value = mb_substr($value,0,80).'...';
        }
        return $value;
    }



//    获取前台首页推荐列表
    public function getRec($limit=3)
    {
        $map = ['is_rec'=>1];
        $data = $this->where($map)->order('id desc')->limit($limit)->select();
        return $data;
    }

//  获取$page页的活动列表
    public function getIndexList($page)
    {
        $data = $this->field(['id','title','time','status','location','cover_img','content'])->order('time desc')->page($page,3)->select();
        return $data;
    }


}