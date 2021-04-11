import { action, observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants, Base64 } from '../core/utils'

class DonateStore {
    @observable
    watermarkImage: string

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
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        const tempFileName = tempFile.name
        const cloudPathName = userid + '/donate/' + tempFileName
        Taro.cloud.uploadFile({
            cloudPath: cloudPathName,
            filePath: tempFile// 文件路径
        }).then(res => {
            // get resource ID
            console.log(res)
            this.getWatermarkImage(res.fileID)
            this.navigateToResult()
        }).catch(error => {
            // handle error
            console.log('error :', error);
        })
    }

    private navigateToResult() {
        Taro.navigateTo({
            url: Constants.PAGE.DonateResult,
        })
    }

    public redirectToIndex() {
        Taro.redirectTo({
            url: Constants.PAGE.Index
        })
    }

    //更新任务状态
    public updateTaskStatus() {
        const cache = new Cache()
        const userid = cache.get(Constants.CACHE_KEY.USER_ID)
        const db = Taro.cloud.database()
        const userCollection = db.collection('user')
        const command = db.command
        userCollection
            .where({
                userid: userid
            })
            .get()
            .then(res => {
                console.log(res)
            })

    }

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
        // const watermarkUrlBase64 = Base64.encode('http://examples-1251000004.picsh.myqcloud.com/shuiyin.jpg', true)
        // const watermarkUrlBase64 = Base64.encode('http://test-1254641557.cos.ap-nanjing.myqcloud.com/shuiyin.jpg', true)
        const watermarkUrlBase64 = Base64.encode(watermarkUrl, true)
        this.watermarkImage = picUrl + '?watermark/1/image/' + watermarkUrlBase64 + '/gravity/southeast'
        // this.watermarkImage = picUrl + '?watermark/1/image/' + 'aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn' + '/gravity/southeast'
        // this.watermarkImage = picUrl + '?watermark/2/text/' + Base64.encode('测试', true) + '/gravity/northeast/dx/20/dy/20/batch/1/degree/45'

        console.log('watermarkImage', this.watermarkImage)

        console.log('text', Base64.encode('http://examplebucket-1250000000.cos.ap-shanghai.myqcloud.com/shuiyin_2.png', true))

        //    https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/421575839/donate/950.jpg?watermark/1/image/aHR0cDovL2V4YW1wbGVzLTEyNTEwMDAwMDQucGljc2gubXlxY2xvdWQuY29tL3NodWl5aW4uanBn/gravity/southeast
        //    https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/421575839/donate/950.jpg?watermark/1/image/aHR0cDovLzMzMzMzLTEyNTMyMzA3NzcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL3dhdGVybWFyay5wbmc/gravity/southeast
        // https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/421575839/donate/951.jpg?watermark/1/image/aHR0cHM6Ly82ZTZmLW5vbnByb2ZpdC04ZzExazVqajdhYTczMGY3LTEyNTQ2NDE1NTcudGNiLnFjbG91ZC5sYS93YXRlcm1hcmsucG5n/gravity/southeast
        // https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/421575839/donate/950.jpg?watermark/1/image/https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/watermark.png/gravity/southeast

        // https://watermark-sh-1252106211.cos.ap-shanghai.myqcloud.com/preview.png?imageMogr2/interlace/0|watermark/1/image/aHR0cDovL3dhdGVybWFyay1zaC0xMjUyMTA2MjExLnBpY3NoLm15cWNsb3VkLmNvbS82ZTZmLW5vbnByb2ZpdC04ZzExazVqajdhYTczMGY3LTEyNTQ2NDE1NTcvMTYxODE1OTkzMS5wbmc=/gravity/southeast/dx/0/dy/0

    }
}

export default new DonateStore()