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

class Info extends Model
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

//    分页获取活动列表,每页$Num个
    public function getList($num)
    {
//        $this->dateFormat = false;
        $data = $this->field(['id','title','author','time','is_rec'])->order('time desc')->paginate($num);
        return $data;
    }

//    添加活动
    public function addInfo()
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
    public function updateInfo($request,$id)
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
        if(key_exists('is_rec',$data)&&$data['is_rec']==1){
            $this->isRec();
        }
        $data = $this->field(['id','title','author','time','is_rec'])->order('time desc')->paginate($page,false,['query'=>request()->param()]);
        return $data;
    }

//    获取前台首页推荐列表
    public function getRec($type=1,$limit=3)
    {
        $map = ['is_rec'=>1,'type'=>$type];
        $data = $this->where($map)->order('id desc')->limit($limit)->select();
        return $data;
    }

//  获取$type的活动分页，每页$page个
    public function getIndexList($type,$page)
    {
        $request = request()->param();
        $request['type'] = $type;
//        分页参数
        $config = ['query'=>$request,'var_page'=>"page$type"];
        $data = $this->where('type','=',$type)->order('id desc')->paginate($page,false,$config);
        return $data;
    }

}