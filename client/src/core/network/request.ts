/**
 * HTTP 网络请求封装
 *
*/

import Taro from '@tarojs/taro'
// cooper framework
import { Constants, Context } from '../utils'
// dependence
import interceptors from './interceptor'
import Response from './response'
import HTTP_STATUS from './http-code'



// 初始化拦截器
interceptors.forEach(interceptor => Taro.addInterceptor(interceptor))


/** 请求方法，默认为post */
type requestMethod = 'POST' | 'GET'

/**
 * @class Request
 * @example
 *
 *
 */
class Request {

  /** @description 请求主机域名 */
  public host: string

  /** @description 请求服务路径 */
  public path: string

  /** @description 请求post参数 */
  public param?: any

  /** @description 是否需要显示全局loading(默认为 true 展示) */
  public isNeedLoading?: boolean

  /** @description 是否需要登录态（需要登录态的request会自动加上 userid and token） */
  public isNeedLogin?: boolean

  /** @description 是否需要必须登录态（如果没登录态将弹出登录） */
  public forceLogin?: boolean

  /**
   * @param {string} host  请求主机域名
   * @param {string} path  请求服务路径
   */
  constructor(host: string, path: string) {
    this.host = host;
    this.path = path
    this.isNeedLoading = true;
  }

  private isUserLogin() {
    return Context.shareInstance().isLogin()
  }

  private createOption(method: requestMethod = 'GET'): Response<any> {
    if (this.forceLogin && !this.isUserLogin()) { // 未登录要去登录
      // Navigator.navigateTo(Constants.PAGE.Login)
      return { code: HTTP_STATUS.LOST_LOGIN }
    }

    const option = {
      url: this.host + this.path,
      data: this.param || {},
      path: this.path,
      method: method,
      isNeedLoading: this.isNeedLoading,
      header: {
        'content-type': 'application/json'
      }
    }
    return Taro.request(option) as unknown as Response<any>
  }

  public async get(data?: object, path?: string) {
    this.param = data;
    if (path) {
      this.path = path;
    }
    return this.createOption('GET')
  }

  public async post(data?: object, path?: string) {
    this.param = data;
    if (path) {
      this.path = path;
    }
    return this.createOption('POST')
  }

  public mock(path: string) {
    this.host = 'http://172.16.2.242/mockapi'
    this.path = path
    return this
  }

  public needLogin(forceLogin = true) {
    this.forceLogin = forceLogin
    this.isNeedLogin = true
    return this
  }

  public needLoading(needLoading = true) {
    this.isNeedLoading = needLoading
    return this
  }

}


export default Request;