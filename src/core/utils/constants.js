/**
 * 常量
 */


const IS_DEBUG = true

const HOST_DEV = 'https://iclient-stg.pingan.com.cn'
const HOST_RELEASE = 'https://iclient.pingan.com.cn'


const Constants = {

  /** 服务主机域名 */
  HOST: {
    HOST_URL: IS_DEBUG ? HOST_DEV : HOST_RELEASE,
  },

  /** 各种加密密钥 */
  SECRET_KEYS: {
  },

  /** 接口请求参数 */
  PATH: {
    ADD_TASKINFO: '/brcp/ac/emp/wdyx/benefit/addTaskInfo',
    GET_SALON_TASKSTATUS: '/brcp/ac/emp/wdyx/benefit/getSalonTaskStatus',
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
    RemouldCourse: '/pages/remould/remould-course',
    Donate: '/pages/donate/donate',
    DonateResult: '/pages/donate/donate-result',
    Share: '/pages/medal/medal',
  },

  // 1-旧衣捐赠 2-旧物改造 3-线下沙龙
  TASK_TYPE: {
    DONATE: '1',
    REMOULD: '2',
    SALON: '3',
  }

}

module.exports = Constants;