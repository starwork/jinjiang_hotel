<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/4 0004
 * Time: 9:28
 */

namespace app\index\controller;
use app\index\model\Activity as ActivityModel;
use app\index\model\Info as InfoModel;

class News extends Base
{
    public function index()
    {
//        获取活动、资讯列表
        $activity = (new ActivityModel())->getIndexList();
        $info = (new InfoModel())->getIndexList();
        $this->assign('activity',$activity);
        $this->assign('info',$info);

        return $this->fetch();
    }
}