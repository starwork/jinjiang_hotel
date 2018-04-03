<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/3/2 0002
 * Time: 10:47
 */

namespace app\admin\controller;

//上传用
class Upload extends Base
{
    private $size = 1048576;
    private $ext = 'jpg,jpeg,png,gif';

//    单图片上传
//          $file  request->file()
//        string $type 类型目录名称，比如banner,news
    public function upload_img($file, $type = 'common'){
        $info = $file->move(config('path.upload'). $type);
        if($info){
            $savePath = $info->getSaveName();
            $savePath = 'upload' . DS . $type . DS . $savePath;
            $savePath = str_replace('\\','/' , $savePath);
            return $savePath;
        }else{
            // 上传失败获取错误信息
            return false;
        }
    }


//    多图片上传
//      $files request->file()
//      string $type 类型目录名称，比如banner,news
    public static function upload_multi_imgs($files, $type = 'common')
    {
        foreach ($files as $file) {
            // 移动到框架应用根目录/public/uploads/ 目录下
            $info = $file->move(config('path.upload'). $type);
            if ($info) {
                // 成功上传后 获取上传信息
                $savePath = $info->getSaveName();
                $savePath = 'upload' . DS . $type . DS . $savePath;
                $savePath = str_replace('\\', '/', $savePath);
                $savePaths[] = $savePath;
            } else {
                return false;
            }
        }
        return $savePaths;
    }



}