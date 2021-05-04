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
            count: 1,
            sourceType: ['camera'],
        }).then(res => {
            console.log('success:', res)
            this.image = res.tempFilePaths[0]
            this.uploadPhotoFile(res.tempFiles[0].originalFileObj)
        }).catch(error => {
            console.log('error :', error);
        })
    },

    uploadPhotoFile(tempFile) {
        Taro.showLoading({
            title: '上传中',
        })
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        const tempFileName = tempFile.name
        const cloudPathName = 'user/' + userid + '/remould/' + tempFileName
        Taro.cloud.uploadFile({
            cloudPath: cloudPathName,
            filePath: tempFile// 文件路径
        }).then(res => {
            Taro.hideLoading()
            // get resource ID
            console.log(res)
            //异步更新任务状态
            this.updateTask()
        }).catch(error => {
            Taro.hideLoading()
            // handle error
            console.log('error :', error);
        })
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
    getWatermarkImage(fileID: string) {
        const fileList = [fileID, 'cloud://nonprofit-8g11k5jj7aa730f7.6e6f-nonprofit-8g11k5jj7aa730f7-1254641557/watermark.png']
        Taro.cloud.getTempFileURL({
            fileList: fileList
        }).then((res) => {
            console.log('res===>', res)
            this.convertWatermarkUrl(res.fileList)
        })

    },

    convertWatermarkUrl(fileList: Array<object>) {
        const picUrl = fileList[0].tempFileURL
        const watermarkUrl: string = fileList[1].tempFileURL
        const watermarkUrlBase64 = Base64.encode(watermarkUrl, true)
        // this.watermarkImage = picUrl + '?watermark/1/image/' + watermarkUrlBase64 + '/gravity/southeast'
        this.watermarkImage = picUrl + '?watermark/1/image/' + 'aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn' + '/gravity/southeast'
    },

    //通知更新旧物改造任务状态
    async updateRemouldTaskStatus() {
        const request = new Request(
            '',
            ''
        );
        const response = await request.post({
        });
    },
    //调平安接口更新任务状态
    async addTaskInfo() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)

        const request = new Request(
            Constants.HOST.HOST_URL,
            Constants.PATH.GET_SALON_TASKSTATUS
        )

        const response = await request.post({
            userId: userid,
            taskName: '旧衣捐赠',
            taskType: '1',//1-旧衣捐赠 2-旧物改造 3-线下沙龙
            finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });

        console.log('addTaskInfo:', response)
    },
    //更新任务
    async updateTask() {
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        Taro.cloud.callFunction({
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
            .then((res) => {
                console.log('updateTask:', res)
            })
            .catch(console.error);
    }
})

export default remouldStore