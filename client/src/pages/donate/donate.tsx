import { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'

import { DonateResultModal } from '../../components'

import './donate.scss'

type PageStateProps = {
  donateStore: {
    takePhoto: Function,
    hideDonateModal: Function,
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

  componentDidMount() { }

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

  render() {
    const { isShowDonateModal } = this.props.donateStore

    return (
      <View className='donate'>
        <View className='back' onClick={() => {
          this._goBack()
        }}>
          <Text className='text'>返回</Text>
        </View>
        <Image className='image-submit-btn' src='https://6e6f-nonprofit-8g11k5jj7aa730f7-1254641557.tcb.qcloud.la/assets/donate/ic_donate_take_photo_btn.png' onClick={() => {
          this._takePhoto()
        }}>拍照上传我的捐赠时刻</Image>

        {isShowDonateModal &&
          <DonateResultModal onCloseClick={() => {
            this._hideDonateModal()
          }} />}
      </View>
    )
  }
}

export default Donate
