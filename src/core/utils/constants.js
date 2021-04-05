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
    /** 用户token */
    USER_TOKEN: 'token',
    /** 用户是否实名 */
    USER_VERIFY: 'verify',
    /** 用户名 */
    USER_NAME: 'name',
    /** 用户手机号 */
    USER_PHONE: 'phone_num',
  },

  // 广播 event key
  EVENT_KEY: {
    LOGIN: 'login',                               // 登录事件
    SEND_LOGIN_SMS: 'send-login-sms',             // 发送验证码短信成功
    LOGIN_STATE_CHANGE: 'login-state-change',     // 登录状态改变
  },

  PAGE: {
    Index: 'modules/pages/index/index',
    Ucenter: 'modules/pages/ucenter/ucenter',
    // 鼎象验证码页
    Verify: 'modules/pages/ucenter/dxVerify',
    Register: 'modules/pages/ucenter/register',
  }

}

module.exports = Constants;