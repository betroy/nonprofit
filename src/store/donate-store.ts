import { action, observable } from 'mobx'
import Taro from '@tarojs/taro'
import { Request } from '../core/network'
import { Cache, Constants, Base64 } from '../core/utils'

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
        const userid = new Cache().get(Constants.CACHE_KEY.USER_ID)
        const tempFileName = tempFile.name
        const cloudPathName = userid + '/donate/' + tempFileName
        Taro.cloud.uploadFile({
            cloudPath: cloudPathName,
            filePath: tempFile// 文件路径
        }).then(res => {
            // get resource ID
            console.log(res)
            // this.getWatermarkImage(res.fileID)
            // this.navigateToResult()
            this.showDonateModal()
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