/**
 * Device 获取设备信息
 *
 * @example
 *
 */
import Taro from '@tarojs/taro'

interface Device {

  /**
   * @description 屏幕设计基准（目前为750）
   * @returns {number}
   * @author luochenxun
   * @date 2020-05-05
   */
  designWidth: number

  /**
   * @description 屏幕高度
   * @returns {number}
   * @author luochenxun
   * @date 2020-05-05
   */
  screenHeight: () => number

  /**
   * @description 屏幕宽度
   * @returns {number}
   * @author luochenxun
   * @date 2020-05-05
   */
  screenWidth: () => number

  /**
   * @description 状态栏高度
   * @type {number}
   * @memberof Device
   */
  statusBarHeight: () => number

  /**
   * @description 屏幕象素深度
   * @type {number}
   * @memberof Device
   */
  pixelRatio: () => number

  /**
   * 压缩图片(把图片压缩到指定的大小以下)
   * @param photoFile 图片路径与大小
   * @param compressThreshold 压缩限制，M为单位
   * @return string 返回压缩后的图片路径
   */
   compressPhoto: (photoFile: { path: string, size: number }, compressThreshold: number) => Promise<string>

  /**
  * @description 客户端平台
  * @type {string}
  * @memberof Device
  */
  platform: () => string

  /**
  * @description 安全区域的相关值
  * @type {string}
  * @memberof Device
  */
  safeArea: () => Taro.General.SafeAreaResult

  /**
  * @description 设备品牌
  * @type {string}
  * @memberof Device
  */
  brand: () => string

  /**
 * @description 设备型号
 * @type {string}
 * @memberof Device
 */
  model: () => string


  getLocation: () => Promise<{
    /** 纬度，范围为 -90~90，负数表示南纬 */
    latitude: number,
    /** 经度，范围为 -180~180，负数表示西经 */
    longitude: number
  }>

  /**
   * @description 打电话
   * @memberof Device
   */
  makePhoneCall: (phoneNumber: string) => void

  /**
  * @description 显示一个Toast提示
  * @memberof Device
  */
  showToast: (msg?: string) => void

  /**
  * @description 显示一个全局加载loading
  * @memberof Device
  */
  showLoading: () => void

  /**
  * @description 隐藏全局加载loading
  * @memberof Device
  */
  hideLoading: () => void

  /**
   * 显示一个对话框
   */
  showDialog: (option: {
    /** 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    cancelColor?: string
    /** 取消按钮的文字，最多 4 个字符 */
    cancelText?: string
    /** 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串 */
    confirmColor?: string
    /** 确认按钮的文字，最多 4 个字符 */
    confirmText?: string
    /** 提示的内容 */
    content?: string
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 提示的标题 */
    title?: string
  }) => Promise<{ /** 取消 */ cancel: boolean, /** 确定 */confirm: boolean}>
}

// interface DevicePrivate {
// }

/**
 *  Device number对象操作工具类
 */
const Device: Device = {

  designWidth: 750,

  model: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.model
  },

  brand: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.brand
  },

  safeArea: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.safeArea
  },

  platform: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.platform
  },

  pixelRatio: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.pixelRatio
  },

  compressPhoto: async (photoFile: { path: string, size: number }, compressThreshold: number) => {
    // 压缩图片(把图片压缩到2m以下)
    let photoPath = photoFile.path;
    const fileSizeM = photoFile.size >> 20
    if (fileSizeM > compressThreshold) {
      const compressRate = (0.5 + compressThreshold / (2 * fileSizeM)) * 100
      // 压缩
      const compressResult = await Taro.compressImage({
        src: photoFile.path,
        quality: compressRate,
      })
      photoPath = compressResult.tempFilePath;

      // 打印查看压缩后图片大小
      const fileInfo = await Taro.getFileInfo({ filePath: compressResult.tempFilePath });
      console.log('after compress size ==> ' + String((fileInfo as Taro.getFileInfo.SuccessCallbackResult).size >> 20) + ' M');
    }

    return photoPath
  },

  screenHeight: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.screenHeight
  },

  screenWidth: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.windowWidth
  },

  statusBarHeight: () => {
    let deviceInfo: Taro.getSystemInfoSync.Result = Taro.getApp().deviceInfo
    if (!deviceInfo) {
      const systemInfo = Taro.getSystemInfoSync()
      Taro.getApp().deviceInfo = systemInfo
      deviceInfo = systemInfo
    }

    return deviceInfo.statusBarHeight
  },

  makePhoneCall: async (phoneNumber: string) => {
    await Taro.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },

  getLocation: async () => {
    return await Taro.getLocation({});
  },

  showToast: (msg?: string) => {
    if (msg) {
      Taro.showToast({
        title: msg,
        icon: "none"
      });
    }
  },

  showLoading: () => {
    Taro.showLoading({
      title: "正在加载...",
      mask: true
    });
  },

  hideLoading: () => {
    Taro.hideLoading();
  },

  showDialog: async (option: {
    cancelColor?: string
    cancelText?: string
    confirmColor?: string
    confirmText?: string
    content?: string
    showCancel?: boolean
    title?: string
  }) => {
    return Taro.showModal(option)
  }

}


export default Device;