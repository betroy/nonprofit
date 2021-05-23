import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import { DonateResultModal } from '../../components'

import './donate.scss'

type PageStateProps = {
  donateStore: {
    takePhoto: Function,
    hideDonateModal: Function,
    navigateToLoadPage: Function,
    setEnv: Function,
    setUserid: Function,
  }
}

interface Donate {
  props: PageStateProps;
}

/**
 * 旧物改造
 */
@inject('donateStore')
@observer
class Donate extends Component {
  componentWillMount() { }

  componentDidMount() {
    window.scrollTo(0, 0)

    //接收小程序传递过来的参数
    console.log('params', getCurrentInstance().router.params)
    const { userId, env } = getCurrentInstance().router.params

    if (userId == undefined) {
      this._navigateToLoadPage()
    } else {
      this._setUserid(userId)
    }

    if (env != undefined) {
      this._setEnv(env)
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  _takePhoto = () => {
    const { donateStore } = this.props
    donateStore.takePhoto()
  }

  _goBack = () => {
    Taro.navigateBack()
  }

  _hideDonateModal = () => {
    const { donateStore } = this.props
    donateStore.hideDonateModal()
  }

  _navigateToLoadPage = () => {
    const { donateStore } = this.props
    donateStore.navigateToLoadPage()
  }

  _setEnv(env: string) {
    const { donateStore } = this.props
    donateStore.setEnv(env)
  }

  _setUserid(userid: string) {
    const { donateStore } = this.props
    donateStore.setUserid(userid)
  }

  render() {
    const { isShowDonateModal } = this.props.donateStore

    return (
      <ScrollView className='donate' scrollY >
        <Image className='donate-bg' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/bg_donate.png' />
        <View className='back' onClick={() => {
          this._goBack()
        }} />
        <View
          onLongPress={() => {
            _hmt.push(['_trackEvent', 'donate', 'onLongPressQRCode']);
          }}
        >
          <Image className='image-donate-tips' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_tips.png'
          />
        </View>
        <Image className='image-submit-btn' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_take_photo_btn.png'
          onClick={() => {
            this._takePhoto()
          }}>拍照上传我的捐赠时刻</Image>

        {isShowDonateModal &&
          <DonateResultModal onCloseClick={() => {
            this._hideDonateModal()
          }} />}
      </ScrollView>
    )
  }
}

export default Donate
