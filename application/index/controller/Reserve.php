<?php
/**
 * Created by PhpStorm.
 * User: nitia
 * Date: 2018/4/4 0004
 * Time: 9:29
 */

namespace app\index\controller;


class Reserve extends Base
{
    public function index()
    {
        return $this->fetch();
    }
}