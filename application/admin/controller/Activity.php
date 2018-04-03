<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 10:54
 */

namespace app\admin\controller;
use app\admin\model\Activity as ActivityModel;
use app\exception\Handler;
use think\Request;

//活动管理
class Activity extends Base
{
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        $this->assign('c',[
            'name'=>'活动管理',
            'url'=>'/admin/activity'
        ]);
    }

//    添加活动页面
    public function add()
    {
        $this->assign('a','添加');
        return $this->fetch();
    }

//    上传图片
    public function upload_cover()
    {
        $img = Request::instance()->file('img');
        $url = (new Upload())->upload_img($img,'activity');
        if(!$url){
            return Handler::fail('上传失败');
        }
        $data = ['img_url'=>$url];
        return Handler::success('上传成功',$data);
    }

//    添加活动
    public function do_add()
    {
        $res = (new ActivityModel())->addActivity();
        if($res){
            return Handler::success('添加成功');
        }
        return Handler::fail('添加失败');
    }

    //    活动列表
    public function index()
    {
        $data = (new ActivityModel())->getList(10);
        $this->assign('data',$data);
        $status = ['','报名中','进行中','已结束'];
        $this->assign('status',$status);
        $this->assign('a','列表');
        return $this->fetch();
    }

    //    设置推荐等状态
    public function set_cond($id)
    {
        $data = Request::instance()->post();
        $res = (new ActivityModel())->set_is($data,$id);
        if($res){
            return Handler::success();
        }
        return Handler::fail();
    }

//    修改活动页面
    public function update($id)
    {
        $this->assign('a','活动修改');
        cookie('activity_id',$id);
        $data = (new ActivityModel())->get($id);
        $this->assign('data',$data);
        return $this->fetch();
    }

//修改活动
    public function do_update()
    {
        $id = cookie('activity_id');
        $request = Request::instance()->param();
        $res = (new ActivityModel())->updateActivity($request,$id);
        if($res){
            return Handler::success('修改成功');
        }
        return Handler::fail('修改失败');
    }

//    删除活动
    public function delete($id)
    {
        $res = (new ActivityModel())->destroy($id);
        if($res){
            return Handler::success('删除成功');
        }
        return Handler::fail('删除失败');
    }

//    搜索
    public function search()
    {
        $this->assign('a','搜索结果');
//        获取筛选条件
        $search = Request::instance()->param();
        $data = (new ActivityModel())->search($search,10);
        $this->assign('data',$data);


        return $this->fetch();
    }



}