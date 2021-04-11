import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants } from '../core/utils'

const indexStore = observable({
  isShowRuleModal: false,
  counter: 0,

  showModal() {
    this.isShowRuleModal = true
  },

  hideModal() {
    this.isShowRuleModal = false
  },

  //查询完成任务人数
  queryTaskFinishCount() {
    const db = Taro.cloud.database()
    const userCollection = db.collection('user')
    const command = db.command
    userCollection
      .where({
        task: command.in([''])
      })
      .count()
      .then(res => {
        console.log(res)
      })
  },

  //查询当前用户任务完成状态
  queryTaskStatus() {
    const cache = new Cache()
    const userid = cache.get(Constants.CACHE_KEY.USER_ID)
    const db = Taro.cloud.database()
    const userCollection = db.collection('user')
    const command = db.command
    userCollection
      .where({
        _openid: command.eq(userid)
      })
      .get()
      .then(res => {
        console.log(res)
      })
  },

  //保留小程序传递的userid
  saveUserid(userid: String) {
    new Cache().set(Constants.CACHE_KEY.USER_ID, userid, true)
  }
})

export default indexStore