import { observable, _allowStateChangesInsideComputed } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants, Base64 } from '../core/utils'
import * as dayjs from 'dayjs'

const remouldStore = observable({
    isShowRuleModal: false,
    watermarkImage: '',
    userid: '', //userId
    env: Constants.ENV_VALUE,

    navigatorToCartonCourse() {
        let urlParams = ''
        if (this.userid) {
            urlParams += '?userId=' + this.userid
        }
        if (this.env) {
            urlParams += '&env=' + this.env
        }
        Taro.navigateTo({
            url: Constants.PAGE.RemouldCartonCourse + urlParams
        })
    },

    navigatorToPlasticCourse() {
        let urlParams = ''
        if (this.userid) {
            urlParams += '?userId=' + this.userid
        }
        if (this.env) {
            urlParams += '&env=' + this.env
        }
        Taro.navigateTo({
            url: Constants.PAGE.RemouldPlasticCourse + urlParams
        })
    },

    navigatorToClothesCourse() {
        let urlParams = ''
        if (this.userid) {
            urlParams += '?userId=' + this.userid
        }
        if (this.env) {
            urlParams += '&env=' + this.env
        }
        Taro.navigateTo({
            url: Constants.PAGE.RemouldClothesCourse + urlParams
        })
    },

    //未携带用户标识的url 先跳去登录页
    navigateToLoadPage() {
        const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

        window.location.href = URL + Constants.H5_PAGE.LoadPage
    },

    //设置env
    setEnv(env: string) {
        if (env != undefined) {
            this.env = env
        }
    },

    //保留小程序传递的userid
    setUserid(userid: string) {
        this.userid = userid
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
        try {
            for (const tempFile of tempFiles) {
                const tempFileName = tempFile.originalFileObj.name
                const cloudPathName = 'user/' + this.userid + '/remould/' + tempFileName
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
    },

    navigateToResult() {
        const URL = '0' == this.env ? Constants.H5_HOST.DEV : Constants.H5_HOST.RELEASE

        window.location.href = URL + Constants.H5_PAGE.TaskSuccess
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
        const URL = '0' == this.env ? Constants.HOST.DEV : Constants.HOST.RELEASE

        const request = new Request(
            URL,
            Constants.PATH.GET_SALON_TASKSTATUS
        )

        try {
            const response = await request.post({
                userId: this.userid,
                taskName: '旧物改造',
                taskType: Constants.TASK_TYPE.REMOULD,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
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
    },
    //更新任务
    async updateTask() {
        try {
            const response = await Taro.cloud.callFunction({
                name: 'add_task_info',
                data: {
                    env: this.env,
                    userId: this.userid,
                    task: {
                        taskName: '旧物改造',
                        taskType: Constants.TASK_TYPE.REMOULD,//1-旧衣捐赠 2-旧物改造 3-线下沙龙
                        finishDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            })
            Taro.hideLoading()
            console.log('updateTask success :>>', response)
            if (response && response.result.returnMsg) {
                Taro.showToast({
                    title: response.returnMsg,
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
})

export default remouldStore