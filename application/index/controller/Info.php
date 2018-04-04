<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 16:21
 */

namespace app\index\controller;


use app\exception\Handler;
use app\index\model\Info as InfoModel;

class Info extends Base
{
//    获取资讯总数
    public function count()
    {
        $count = (new InfoModel())->count();
        if($count){
            return Handler::success('获取成功',$count);
        }
        return Handler::fail();
    }

//分页获取数据
    public function index($page)
    {
        $data = (new InfoModel())->getIndexList($page);
        if($data){
            return Handler::success('获取成功',$data);
        }
        return Handler::fail();
    }

//    详情页
    public function detail($id)
    {
        $rec = (new InfoModel())->getRec(3);
        $this->assign('rec',$rec);
        $data = (new InfoModel())->get($id);
        $content = db('info')->field('content')->find($id);
        $this->assign('content',$content);
        $this->assign('data',$data);
        return $this->fetch();
//        return json($data);
    }



}