<?php
namespace app\admin\controller;

class Index extends Base
{
//    后台首页
    public function index()
    {
        return $this->fetch();
    }

//    首页内容
    public function page()
    {
        $this->assign('c',[
            'name'=>'首页',
            'url'=>'/admin/index/page'
        ]);
        $this->assign('a','首页');
        return $this->fetch();
    }
}
