/**
 * HTTP Interceptor
 *
*/
import Taro from '@tarojs/taro'
// 3rd
// import * as _ from 'lodash';
import { Constants, Context } from '../utils'
// dependence
import HTTP_STATUS from './http-code'
import Response from './response'


var LoadingCount = 0;
const decLoadingCount = () => {
  LoadingCount--
  if (LoadingCount < 0) {
    LoadingCount = 0;
  }
}
const incLoadingCount = () => {
  LoadingCount++
  if (LoadingCount <= 0) {
    LoadingCount = 1;
  }
}

const addParams = (requestParams: { data: { userid: string, token: string, from: string } }) => {
}


const LoadingInterceptor = (chain: any) => {
  const requestParams = chain.requestParams

  // loading 切片
  if (requestParams.isNeedLoading) {
    if (LoadingCount <= 0) { Taro.showLoading({title: '加载中'}) }
    incLoadingCount();
  }

  return chain.proceed(requestParams).catch((err: any) => {

    // loading 切片
    if (requestParams.isNeedLoading) {
      if (LoadingCount <= 1) { Taro.hideLoading() }
      decLoadingCount();
    }

    throw err
  }).then((res: Response<any>) => {

    // loading 切片
    if (requestParams.isNeedLoading) {
      if (LoadingCount <= 1) { Taro.hideLoading() }
      decLoadingCount();
    }

    return res;
  });
}

/**
 * 自定义HTTP拦截器
 * @param {*} chain
 */
const Interceptor = (chain: any) => {
  const requestParams = chain.requestParams

  addParams(requestParams)

  return chain.proceed(requestParams)
    .catch((res: Response<any>) => {
      res.cmd = requestParams.data.cmd;
    })
    .then((res: Response<any>) => {
      if (res == null) {
        throw new Error()
      }

      res.cmd = requestParams.data.cmd;

      let errorMsg = res.data && res.data.msg;
      if (res.statusCode != HTTP_STATUS.HTTP_SUCCESS) {
        errorMsg = (res.data && res.data.message) || res.message || res.msg;
      }

      //处理业务逻辑错误
      let code: number = parseInt(res.data && res.data.code)
      if (code != 0) {
        code = res.statusCode || HTTP_STATUS.NETWORK_ERROR;
      }

      return {
        statusCode: res.statusCode,
        cmd: requestParams.data.cmd,
        code: code,
        data: res.data && res.data.data,
        msg: errorMsg
      }
    })
    .catch((e: Error) => {
      console.log('Error occur ==>', e);
      return {
        statusCode: HTTP_STATUS.NETWORK_ERROR,
        code: HTTP_STATUS.NETWORK_ERROR,
        cmd: requestParams.data.cmd,
      }
    });
}

const interceptors = [
  // Interceptor,
  // LoadingInterceptor,
  Taro.interceptors.logInterceptor,
  Taro.interceptors.timeoutInterceptor
]

export default interceptors