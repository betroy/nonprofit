/**
 * 常量
 */


const IS_DEBUG = true

const HOST_SWEB_DEV = ''
const HOST_SWEB = ''

const H5_CND_DEV = ''
const H5_CND = ''


const Constants = {

  /** 服务主机域名 */
  HOST: {
    /** jyb 服务主域名 */
    HOST_SWEB: IS_DEBUG ? HOST_SWEB_DEV : HOST_SWEB,

    H5_CDN: IS_DEBUG ? H5_CND_DEV : H5_CND,
  },

  /** 各种加密密钥 */
  SECRET_KEYS: {
  },

  /** 接口请求参数 */
  PATH: {
    /** app 接入层 */
    APP_ACCESS: '/Trans/access2',
  },


  /** 命令字 */
  CMD: {

  },

  /** 通用缓存 key */
  CACHE_KEY: {
    /** 用户ID */
    USER_ID: 'userid',
  },

  // 广播 event key
  EVENT_KEY: {
    LOGIN: 'login',               // 登录事件
  },

  PAGE: {
    Index: '/pages/index/index',
    Remould: '/pages/remould/remould',
    RemouldResult: '/pages/remould/remould-result',
    RemouldCourse:'/pages/remould/remould-course',
    Donate: '/pages/donate/donate',
    DonateResult: '/pages/donate/donate-result',
    Share: '/pages/medal/medal',
  }

}

module.exports = Constants;