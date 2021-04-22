import Taro from '@tarojs/taro'
// 内核
import cloudbase from "@cloudbase/js-sdk/app";
// 登录模块
import "@cloudbase/js-sdk/auth";
// 云函数模块
import "@cloudbase/js-sdk/functions";
// 云存储模块
import "@cloudbase/js-sdk/storage";
// 数据库模块
import "@cloudbase/js-sdk/database";

import { Constants } from './core/utils'

Taro.cloud = cloudbase.init({
    env: Constants.ENV.ID
})
