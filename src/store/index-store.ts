import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'

const indexStore = observable({
  isShowRuleModal: false,
  counter: 0,

  showModal() {
    this.isShowRuleModal = true
    console.log('indexStore')
  },

  hideModal() {
    this.isShowRuleModal = false
  },

  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--

    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})

export default indexStore