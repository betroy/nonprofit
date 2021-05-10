import { action, observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants, Base64 } from '../core/utils'
import * as dayjs from 'dayjs'

class DonateStore {
    @observable
    watermarkImage: string
    @observable
    isShowDonateModal = false

    userid: string = ''//userId
    env = Constants.ENV_VALUE //env

    @action
    public takePhoto() {
        Taro.chooseImage({
            count: 9, // 默认9
            sourceType: ['camera'],
        }).then(res => {
            console.log('success:', res)
            this.uploadPhotoFile(res.tempFiles)
        }).catch(error => {
            console.log('error :', error);
        })
    }

    @action
    public async uploadPhotoFile(tempFiles) {
        Taro.showLoading({
            title: '上传中',
        })

        try {
            for (const tempFile of tempFiles) {
                const tempFileName = tempFile.originalFileObj.name
                const cloudPathName = 'user/' + this.userid + '/donate/' + tempFileName
                const res = await Taro.cloud.uploadFile({
                    cloudPath: cloudPathName,
                    filePath: tempFile.originalFileObj// 文件路径
                })
                console.log('uploadPhotoFile success :>>', res)
            }
            //异步更新任务状态
            this.updateTask()
            // this.addTaskInfo()
        } catch (error) {
            Taro.hideLoading()
            console.log('uploadPhotoFile error :>> ', error)
            throw error
        }
    }

    private navigateToResult() {
        const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

        window.location.href = URL + Constants.H5_PAGE.TaskSuccess
    }

    public redirectToIndex() {
        Taro.redirectTo({
            url: Constants.PAGE.Index
        })
    }

    //未携带用户标识的url 先跳去登录页
    public navigateToLoadPage() {
        const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

        window.location.href = URL + Constants.H5_PAGE.LoadPage
    }

    //设置env
    setEnv(env: string) {
        if (env != undefined) {
            this.env = env
        }
    }

    //保留小程序传递的userid
    setUserid(userid: string) {
        this.userid = userid
    }

    //调平安接口更新任务状态
    public async addTaskInfo() {
        const URL = '0' == this.env ? Constants.HOST.DEV : Constants.HOST.RELEASE

        const request = new Request(
            URL,
            Constants.PATH.GET_SALON_TASKSTATUS
        )

        try {
            const response = await request.post({
                userId: this.userid,
                taskName: '旧衣捐赠',
                taskType: Constants.TASK_TYPE.DONATE,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
            console.log('addTaskInfo success :>>', response)
            if (response && response.data.returnCode == '0000') {
                this.updateTask()
            } else {
                Taro.hideLoading()
            }
        } catch (error) {
            Taro.hideLoading()
            console.log('addTaskInfo error :>> ', error)
            throw error
        }

    }

    //更新任务
    public async updateTask() {
        try {
            const response = await Taro.cloud.callFunction({
                name: 'add_task_info',
                data: {
                    env: this.env,
                    userId: this.userid,
                    task: {
                        taskName: '旧衣捐赠',
                        taskType: Constants.TASK_TYPE.DONATE,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                        finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            })
            Taro.hideLoading()
            console.log('updateTask success :>>', response)
            if (response && response.result.returnMsg) {
                Taro.showToast({
                    title: response.result.returnMsg,
                    icon: 'none',
                    duration: 2000
                })

                return
            }

            if (response && response.result.data) {
                this.navigateToResult()
            }
        } catch (error) {
            Taro.hideLoading()
            console.log('updateTask error :>> ', error)
            throw error
        }
    }

    //更新任务
    // public async updateTask() {
    //     const isFinish = await this.queryTaskDetailStatus()
    //     console.log('updateTask isFinish:', isFinish)
    //     if (!isFinish) {
    //         this.addTaskDetail()
    //     }

    //     const isDone = await this.queryTaskStatus()
    //     console.log('updateTask isDone:', isDone)
    //     if (!isDone) {
    //         this.addTask()
    //     }
    // }

    //更新任务明细
    // public addTaskDetail() {
    //     const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
    //     const db = Taro.cloud.database()
    //     const userCollection = db.collection('taskDetail')
    //     userCollection
    //         .add({
    //             userId: userid,
    //             taskName: '旧衣捐赠',
    //             taskType: Constants.TASK_TYPE.DONATE,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
    //             finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    //         })
    //         .then(res => {
    //             console.log('addTaskDetail  success:>> ', res)
    //         })
    //         .catch((e) => {
    //             console.log('addTaskDetail error :>> ', e)
    //         });

    // }

    //更新任务
    // public addTask() {
    //     const cache = new Cache()
    //     const userid = cache.get(Constants.CACHE_KEY.USER_ID)
    //     const db = Taro.cloud.database()
    //     const userCollection = db.collection('task')
    //     userCollection
    //         .add({
    //             userId: userid,
    //             taskStatus: '1',//1-已完成
    //             finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    //         })
    //         .then(res => {
    //             console.log('addTask  success:>> ', res)
    //         })
    //         .catch((e) => {
    //             console.log('addTask error :>> ', e)
    //         });
    // }

    //查询是否已经完成过任务
    // public async queryTaskDetailStatus() {
    //     const cache = new Cache()
    //     const userid = cache.get(Constants.CACHE_KEY.USER_ID)
    //     const db = Taro.cloud.database()
    //     const userCollection = db.collection('taskDetail')
    //     try {
    //         const { total } = await userCollection
    //             .where({
    //                 userId: userid,
    //                 taskType: '1',
    //             })
    //             .count()
    //         console.log('queryTaskDetailStatus success total is===>', total)
    //         return total > 0
    //     } catch (error) {
    //         console.log('queryTaskDetailStatus error :>> ', error)
    //         throw error
    //     }
    // }

    //查询是否已经完成过任务
    // public async queryTaskStatus() {
    //     const cache = new Cache()
    //     const userid = cache.get(Constants.CACHE_KEY.USER_ID)
    //     const db = Taro.cloud.database()
    //     const userCollection = db.collection('task')
    //     try {
    //         const { total } = await userCollection
    //             .where({
    //                 userId: userid,
    //             })
    //             .count()
    //         console.log('queryTaskStatus success total is===>', total)
    //         return total > 0
    //     } catch (error) {
    //         console.log('queryTaskStatus error :>> ', error)
    //         throw error
    //     }
    // }

    //获取水印图片
    // private getWatermarkImage(fileID: string) {
    //     const fileList = [fileID, 'cloud://nonprofit-8g11k5jj7aa730f7.6e6f-nonprofit-8g11k5jj7aa730f7-1254641557/watermark.png']
    //     Taro.cloud.getTempFileURL({
    //         fileList: fileList
    //     }).then((res) => {
    //         console.log('res===>', res)
    //         this.convertWatermarkUrl(res.fileList)
    //     })
    // }

    // private convertWatermarkUrl(fileList: Array<object>) {
    //     const picUrl = fileList[0].tempFileURL
    //     const watermarkUrl: string = fileList[1].tempFileURL
    //     const watermarkUrlBase64 = Base64.encode(watermarkUrl, true)
    //     this.watermarkImage = picUrl + '?watermark/1/image/' + watermarkUrlBase64 + '/gravity/southeast'
    // }

    @action
    public showDonateModal() {
        this.isShowDonateModal = true
    }

    @action
    public hideDonateModal() {
        this.isShowDonateModal = false
    }
}

export default new DonateStore()