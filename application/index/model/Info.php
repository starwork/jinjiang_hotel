<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 16:43
 */

namespace app\index\model;


use think\Model;

class Info extends Model
{
//    字符串返回时间戳格式
    public function getTimeAttr($value)
    {
        $time =  strtotime($value);
//        $day = date('d',1);
        $day = date('d',$time);
//        $month = date('m',2);
        $month = date('m',$time);
//        $year = date('Y',3);
        $year = date('Y',$time);
        $time = ['year'=>$year,'month'=>$month,'day'=>$day];
        return $time;
    }

//    内容截取
    public function getContentAttr($value)
    {
        $value =preg_replace("/<.*?>/",'',$value);
        $len = mb_strlen($value);
        if($len>60){
            $value = mb_substr($value,0,60).'...';
        }
        return $value;
    }



//    获取推荐列表
    public function getRec($limit=3)
    {
        $data = $this->where('is_rec','=',1)->order('id desc')->limit($limit)->select();
        return $data;
    }

//  获取$page页的资讯列表
    public function getIndexList()
    {
        $data = $this->field(['id','title','time','cover_img','content'])->order('time desc')->select();
        return $data;
    }


}