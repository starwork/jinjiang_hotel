<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/3/12 0012
 * Time: 9:17
 */

namespace app\admin\model;


use think\Model;
use think\Request;

class Activity extends Model
{

//    根据标题
    protected function scopeTitleLike($query,$title)
    {
        $query->where('title','like',"%$title%");
    }



//    根据是否推荐
    protected function scopeIsRec($query)
    {
        $query->where('is_rec','=',1);
    }

//根据活动状态
    protected function scopeStatus($query,$status)
    {
        $query->where('status','=',$status);
    }


//    分页获取活动列表,每页$Num个
    public function getList($num)
    {
//        $this->dateFormat = false;
        $data = $this->field(['id','title','author','time','status','is_rec'])->order('time desc')->paginate($num);
        return $data;
    }

//    添加活动
    public function addActivity()
    {
        $request = Request::instance()->param();
        $data = $this->allowField(true)->save($request);
        return $data;
    }

    //    改变is_字段
    public function set_is($data,$id)
    {
        $field = $data['field'];
        $info = $data['info'];
        if($info == 'commit'){
            $map[$field] = "1";
        }else{
            $map[$field] = "0";
        }
        $res = $this->save($map,['id'=>$id]);
        return $res;
    }

//    修改活动
    public function updateActivity($request,$id)
    {
        if(!key_exists('is_rec',$request)){
            $request['is_rec'] = 0;
        }
        $data = $this->allowField(true)->save($request,['id'=>$id]);
        return $data;
    }

    //搜索
    public function search($data,$page)
    {
        $title = trim($data['title']);
        if($title){
            $this->titleLike($title);
        }
        if($data['status']){
            $this->status($data['status']);
        }
        if(key_exists('is_rec',$data)&&$data['is_rec']==1){
            $this->isRec();
        }
        $data = $this->field(['id','title','author','time','is_rec'])->order('time desc')->paginate($page,false,['query'=>request()->param()]);
        return $data;
    }




}