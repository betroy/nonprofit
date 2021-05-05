import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants, Base64 } from '../core/utils'
import * as dayjs from 'dayjs'

const remouldStore = observable({
    isShowRuleModal: false,
    watermarkImage: '',

    navigatorToCartonCourse() {
        Taro.navigateTo({
            url: Constants.PAGE.RemouldCartonCourse
        })
    },

    navigatorToPlasticCourse() {
        Taro.navigateTo({
            url: Constants.PAGE.RemouldPlasticCourse
        })
    },

    navigatorToClothesCourse() {
        Taro.navigateTo({
            url: Constants.PAGE.RemouldClothesCourse
        })
    },

    takePhoto() {
        Taro.chooseImage({
            count: 9, // 默认9
            sourceType: ['camera'],
        }).then(res => {
            console.log('success:', res)
            this.uploadPhotoFile(res.tempFiles)
        }).catch(error => {
            console.log('error :', error);
        })
    },

    async uploadPhotoFile(tempFiles) {
        Taro.showLoading({
            title: '上传中',
        })
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        try {
            for (const tempFile of tempFiles) {
                const tempFileName = tempFile.originalFileObj.name
                const cloudPathName = 'user/' + userid + '/remould/' + tempFileName
                const res = await Taro.cloud.uploadFile({
                    cloudPath: cloudPathName,
                    filePath: tempFile.originalFileObj// 文件路径
                })
                console.log('uploadPhotoFile success :>>', res)
            }
            //异步更新任务状态
            // this.updateTask()
            this.addTaskInfo()
        } catch (error) {
            Taro.hideLoading()
            console.log('uploadPhotoFile error :>> ', error)
            throw error
        }
    },

    navigateToResult() {
        Taro.navigateTo({
            url: Constants.PAGE.RemouldResult,
        })
    },

    redirectToIndex() {
        Taro.redirectTo({
            url: Constants.PAGE.Index
        })
    },

    //获取水印图片
    // getWatermarkImage(fileID: string) {
    //     const fileList = [fileID, 'cloud://nonprofit-8g11k5jj7aa730f7.6e6f-nonprofit-8g11k5jj7aa730f7-1254641557/watermark.png']
    //     Taro.cloud.getTempFileURL({
    //         fileList: fileList
    //     }).then((res) => {
    //         console.log('res===>', res)
    //         this.convertWatermarkUrl(res.fileList)
    //     })

    // },

    // convertWatermarkUrl(fileList: Array<object>) {
    //     const picUrl = fileList[0].tempFileURL
    //     const watermarkUrl: string = fileList[1].tempFileURL
    //     const watermarkUrlBase64 = Base64.encode(watermarkUrl, true)
    //     // this.watermarkImage = picUrl + '?watermark/1/image/' + watermarkUrlBase64 + '/gravity/southeast'
    //     this.watermarkImage = picUrl + '?watermark/1/image/' + 'aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn' + '/gravity/southeast'
    // },

    //调平安接口更新任务状态
    async addTaskInfo() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)

        const request = new Request(
            Constants.HOST.HOST_URL,
            Constants.PATH.GET_SALON_TASKSTATUS
        )

        try {
            const response = await request.post({
                userId: userid,
                taskName: '旧物改造',
                taskType: Constants.TASK_TYPE.REMOULD,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
            console.log('addTaskInfo success :>>', response)

            this.updateTask()
        } catch (error) {
            Taro.hideLoading()
            console.log('addTaskInfo error :>> ', error)
            throw error
        }
    },
    //更新任务
    async updateTask() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        try {
            const response = await Taro.cloud.callFunction({
                name: 'add_task_info',
                data: {
                    userId: userid,
                    task: {
                        taskName: '旧物改造',
                        taskType: Constants.TASK_TYPE.REMOULD,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                        finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            })
            Taro.hideLoading()
            console.log('updateTask success :>>', response)
            // this.navigateToResult()
        } catch (error) {
            Taro.hideLoading()
            console.log('updateTask error :>> ', error)
            throw error
        }
    }
})

export default remouldStore