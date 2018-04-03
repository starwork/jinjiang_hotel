<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/3 0003
 * Time: 16:16
 */

namespace app\index\controller;


use think\Controller;
use think\Request;

class Base extends Controller
{
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        header("Access-Control-Allow-Origin: *");
    }
}