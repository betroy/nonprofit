/**
 * 常量
 */

const ENV = '1' //0--测试环境  1--生产环境

const IS_DEBUG = true

const HOST_DEV = 'https://iclient-stg.pingan.com.cn'
const HOST_RELEASE = 'https://iclient.pingan.com.cn'

const H5_HOST_DEV = 'https://test-b-fat.pingan.com.cn'
const H5_HOST_RELEASE = 'https://b.pingan.com.cn'

const ENV_DEV = 'nonprofit-8g11k5jj7aa730f7'
const ENV_RELEASE = 'nonprofit-8g11k5jj7aa730f7'

const Constants = {

  /** 服务主机域名 */
  HOST: {
    // HOST_URL: IS_DEBUG ? HOST_DEV : HOST_RELEASE,
    DEV: HOST_DEV,
    RELEASE: HOST_RELEASE,
  },

  /** 外部H5域名 */
  H5_HOST: {
    // H5_HOST_URL: IS_DEBUG ? H5_HOST_DEV : H5_HOST_RELEASE,
    DEV: H5_HOST_DEV,
    RELEASE: H5_HOST_RELEASE,
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

    /** env */
    ENV: 'env',
  },

  // 广播 event key
  EVENT_KEY: {
    LOGIN: 'login',               // 登录事件
  },

  PAGE: {
    Index: '/pages/index/index',
    Remould: '/pages/remould/remould',
    RemouldResult: '/pages/remould/remould-result',
    RemouldCartonCourse: '/pages/remould/remould-carton-course',
    RemouldPlasticCourse: '/pages/remould/remould-plastic-course',
    RemouldClothesCourse: '/pages/remould/remould-clothes-course',
    Donate: '/pages/donate/donate',
    DonateResult: '/pages/donate/donate-result',
    Share: '/pages/medal/medal',
  },

  H5_PAGE: {
    LoadPage: '/branch/mkt/benefit/dist/index.html#/loadpage',
    TaskSuccess: '/kuaizhan/page/optmng/stationmgmt/20210416/h46905.html?ai_id=kuaizhan_h46905',
    SharePage: '/kuaizhan/page/optmng/stationmgmt/20210506/h47867.html?ai_id=kuaizhan_h47867',
    SalonPage: '/branch/mkt/receptionroom/salon/index.html#/activityList?default=002&orgId=0800&subjectTag=低碳创益营'
  },

  // 1-旧衣捐赠 2-旧物改造 3-线下沙龙
  TASK_TYPE: {
    DONATE: '1',
    REMOULD: '2',
    SALON: '3',
  },

  //云开发环境ID
  ENV: {
    ID: IS_DEBUG ? ENV_DEV : ENV_RELEASE
  }
}

module.exports = Constants;
