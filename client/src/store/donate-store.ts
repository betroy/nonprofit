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

    @action
    public takePhoto() {
        Taro.chooseImage({
            count: 1,
            sourceType: ['camera'],
        }).then(res => {
            console.log('success:', res)
            this.uploadPhotoFile(res.tempFiles[0].originalFileObj)
        }).catch(error => {
            console.log('error :', error);
        })
    }

    @action
    public uploadPhotoFile(tempFile) {
        Taro.showLoading({
            title: '上传中',
        })
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        const tempFileName = tempFile.name
        const cloudPathName = 'user/' + userid + '/donate/' + tempFileName
        Taro.cloud.uploadFile({
            cloudPath: cloudPathName,
            filePath: tempFile// 文件路径
        }).then(res => {
            Taro.hideLoading()
            // get resource ID
            console.log(res)
            this.navigateToResult()
            // this.showDonateModal()
            //异步更新任务状态
            this.updateTask()
        }).catch(error => {
            Taro.hideLoading()
            // handle error
            console.log('error :', error);
        })
    }

    private navigateToResult() {
        window.open(Constants.H5_HOST.H5_HOST_URL + Constants.H5_PAGE.DonateSuccess)
    }

    public redirectToIndex() {
        Taro.redirectTo({
            url: Constants.PAGE.Index
        })
    }

    //调平安接口更新任务状态
    public async addTaskInfo() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)

        const request = new Request(
            Constants.HOST.HOST_URL,
            Constants.PATH.GET_SALON_TASKSTATUS
        )

        const response = await request.post({
            userId: userid,
            taskName: '旧衣捐赠',
            taskType: Constants.TASK_TYPE.DONATE,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
            finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });

        console.log('addTaskInfo:', response)
    }

    //更新任务
    public async updateTask() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        Taro.cloud.callFunction({
            name: 'add_task_info',
            data: {
                userId: userid,
                task: {
                    taskName: '旧衣捐赠',
                    taskType: Constants.TASK_TYPE.DONATE,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                    finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                }
            }
        })
            .then((res) => {
                console.log('updateTask:', res)
            })
            .catch(console.error);
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
    private getWatermarkImage(fileID: string) {
        const fileList = [fileID, 'cloud://nonprofit-8g11k5jj7aa730f7.6e6f-nonprofit-8g11k5jj7aa730f7-1254641557/watermark.png']
        Taro.cloud.getTempFileURL({
            fileList: fileList
        }).then((res) => {
            console.log('res===>', res)
            this.convertWatermarkUrl(res.fileList)
        })

    }

    private convertWatermarkUrl(fileList: Array<object>) {
        const picUrl = fileList[0].tempFileURL
        const watermarkUrl: string = fileList[1].tempFileURL
        const watermarkUrlBase64 = Base64.encode(watermarkUrl, true)
        this.watermarkImage = picUrl + '?watermark/1/image/' + watermarkUrlBase64 + '/gravity/southeast'
    }

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