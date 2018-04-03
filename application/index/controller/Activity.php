<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 16:22
 */

namespace app\index\controller;
use app\exception\Handler;
use app\index\model\Activity as ActivityModel;

class Activity extends Base
{
//    获取活动总数
    public function count()
    {
        $count = (new ActivityModel())->count();
        if($count){
            return Handler::success('获取成功',$count);
        }
        return Handler::fail();
    }

//分页获取数据
    public function index($page)
    {
        $data = (new ActivityModel())->getIndexList($page);
        if($data){
            return Handler::success('获取成功',$data);
        }
        return Handler::fail();
    }

//    详情页
    public function detail($id)
    {
        $data = db('activity')->find($id);
        $this->assign('data',$data);
        return $this->fetch();
//        return json($data);
    }

}