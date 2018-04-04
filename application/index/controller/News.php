<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/4 0004
 * Time: 9:28
 */

namespace app\index\controller;


class News extends Base
{
    public function index()
    {
        return $this->fetch();
    }
}