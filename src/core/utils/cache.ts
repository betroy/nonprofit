/**
 * 全局变量
 *
*/
import Taro from '@tarojs/taro'


export default class Cache {

  private cache: any

  constructor() {
    this.cache = {};
  }

  /**
   * @description 基于一个Key，缓存一个字符串、数据或对象
   * @param {string} key
   * @param {(string | Array<any> | object)} val
   * @param [forceLocal=false] 是否强制缓存到本地存储，会有一定IO开销，默认为false。如非强烈要求顺序，没必要强制写
   */
  set = (key: string, val: string | Array<any> | object, forceLocal = false) => {
    this.cache[key] = val

    //缓存到本地--同步
    if (forceLocal) {
      Taro.setStorageSync(key, val)
    } else {
      Taro.setStorage({ key, data: val })
    }
  }

  /**
  * @description 从缓存中取出对象
  * @date 2020-05-12
  * @param {string} key
  * @param [forceLocal=false] 是否强制从本地存储中读取，默认为false。会有一定开销，一般读没必要强读
  */
  get = (key: string, forceLocal = false) => {
    let value = this.cache[key]

    //是否从缓存中取值
    if (forceLocal || value == null) {
      value = Taro.getStorageSync(key)
    }

    return value
  }

  /**
   * 删除缓存对象
   * @param key
   * @param forceLocal
   */
  remove = (key: string, forceLocal = false) => {
    if (this.cache[key]) delete this.cache.key

    if (forceLocal) {
      Taro.removeStorageSync(key)
    } else {
      Taro.removeStorage({ key })
    }
  }

}