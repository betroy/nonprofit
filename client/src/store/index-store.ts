import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants } from '../core/utils'

const indexStore = observable({
  isShowRuleModal: false,
  taskFinishCount: 0, //任务完成人数
  donateBookCount: 0, //已捐出书本数量 人数除以10
  isFinishDonateTask: false,  //是否完成旧衣捐赠任务
  isFinishRemouldTask: false, //是否完成旧物改造任务
  isFinishSalonTask: false, //是否完成线下沙龙任务
  userid: '', //userId
  evn: Constants.ENV,

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
    userCollection
      .count()
      .then(res => {
        console.log('queryTaskFinishCount:', res)
        //  res：{requestId: "1ff3257ff4f8c", total: 1}
        this.taskFinishCount = res.total
        this.donateBookCount = parseInt((res.total / 10).toString())
      })
  },

  // //查询当前用户任务完成状态
  // queryTaskStatus() {
  //   const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
  //   const db = Taro.cloud.database()
  //   const userCollection = db.collection('taskDetail')
  //   const command = db.command
  //   userCollection
  //     .where({
  //       userId: userid
  //     })
  //     .get()
  //     .then(res => {
  //       console.log('queryTaskStatus:', res)
  //       this.assembleTaskStatus(res.data)
  //     })
  // },

  // assembleTaskStatus(taskList: Array<Object>) {
  //   for (const task of taskList) {
  //     console.log('task===>', task)
  //     if (Constants.TASK_TYPE.DONATE == task.taskType) {
  //       this.isFinishDonateTask = true
  //     } else if (Constants.TASK_TYPE.REMOULD == task.taskType) {
  //       this.isFinishRemouldTask = true
  //     }
  //   }
  // },

  //查询当前用户任务完成状态
  queryTaskStatus() {
    Taro.cloud.callFunction({
      name: 'get_task_status',
      data: {
        userId: this.userid
      }
    })
      .then((res) => {
        console.log('queryTaskStatus:', res)
        this.assembleTaskStatus(res.result.data)
      })
      .catch(console.error);
  },

  assembleTaskStatus(data: Array<Object>) {
    if (data.length > 0) {
      const user = data[0]
      const taskList = user.taskList
      for (const task of taskList) {
        console.log('task===>', task)
        if (Constants.TASK_TYPE.DONATE == task.taskType) {
          this.isFinishDonateTask = true
        } else if (Constants.TASK_TYPE.REMOULD == task.taskType) {
          this.isFinishRemouldTask = true
        }
      }
    }
  },

  //查询线下沙龙任务完成状态
  async querySalonTaskStatus() {
    const URL = '0' == this.env ? Constants.HOST.DEV : Constants.HOST.RELEASE

    const request = new Request(
      URL,
      Constants.PATH.GET_SALON_TASKSTATUS
    )

    try {
      const response = await request.post({
        userId: this.userid
      });
      if (response.returnData &&
        response.returnData.finishStatus == '1') {
        this.isFinishSalonTask = true
      } else {
        this.isFinishSalonTask = false
      }

      console.log('querySalonTaskStatus success :>>', response)
    } catch (error) {
      console.log('querySalonTaskStatus error :>> ', error)
      throw error
    }
  },

  //保留小程序传递的userid
  setUserid(userid: String) {
    this.userid = userid
  },

  //设置env
  setEnv(env: String) {
    if (env != undefined) {
      this.env = env
    }
  },

  //未携带用户标识的url 先跳去登录页
  navigateToLoadPage() {
    const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

    window.location.href = URL + Constants.H5_PAGE.LoadPage
  },

  navigateToDonate() {
    Taro.navigateTo({
      url: Constants.PAGE.Donate + '?userId=' + this.userid + '&env=' + this.env
    })
  },

  navigateToRemould() {
    Taro.navigateTo({
      url: Constants.PAGE.Remould + '?userId=' + this.userid + '&env=' + this.env
    })
  },

  navigateToSalon() {
    const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

    window.location.href = URL + Constants.H5_PAGE.SalonPage
  },
})

export default indexStore